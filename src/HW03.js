import React from 'react';
import axios from 'axios';

class HW03 extends React.Component {
    fetchDataFromServer = () => {
        const key = '51f7a66f03c8df5b96089f58bfb51cd0';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=${key}`;
        const axiosGetResponse = axios.get(url); // return Promise
        function doSomethingWhenAxiosFinish(axiosResponseFromServer) {
            if (axiosResponseFromServer.status === 200) {
                this.setState({
                    weather: axiosResponseFromServer.data
                });
            }
        }
        axiosGetResponse.then(doSomethingWhenAxiosFinish.bind(this));
    };

    constructor(props) {
        super(props);
        this.state = {
            city: props.city || 'New York',
            weather: {},
        };
        console.log('constructor');
    }
    componentDidMount() {
        console.log('componentDidMount');
        this.fetchDataFromServer();
    }
    onTextInputChange = (event) => {
        console.info('the user entered: ', event.target.value)
        this.setState({
            city: event.target.value
        })
    };
    onSendCityToServerClick = (event) => {
        this.fetchDataFromServer();
    };
    render() {
        const weather = this.state.weather;
        if (weather.main) {
            return (
                <div className="info-box">
                    <input onChange={this.onTextInputChange} />
                    <button onClick={this.onSendCityToServerClick}>Search</button>
                    <div className="inner-info">
                    <div>{weather.name},{weather.sys.country}</div>
                    <br/>
                    <div>{weather.main.temp}</div>
                    <div>{weather.weather[0].description}</div>
                    <div>{`Feels like ${weather.main.feels_like}`}</div>
                    </div>
                </div>
            );
        }
        return <div>Loading...</div>;
    }
}

export default HW03;