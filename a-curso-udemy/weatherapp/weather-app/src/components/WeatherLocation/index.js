// a44e66f9f43213e2c5cb7a17ab19432e
// http://api.openweathermap.org/data/2.5/weather?q=[LOCATION]&appid=[KEY]

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import transfromWeather from '../../services/transformWeather';
import getUrlWeatherByCity from '../../services/getUrlWeatherByCity';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';

/*import {
    CLOUD,
    CLOUDY,
    SUN,
    RAIN,
    SNOW,
    WINDY
} from '../../constants/weathers';

const data = {
    temperature: 5,
    weatherState: SUN,
    humidity:10,
    wind: 10

};*/

class WeatherLocation extends Component {

    constructor(props){
        super(props);

        const { city } = props;
        this.state = {
            city,
            data: null
        };
        console.log("constructor WeatherLocation");
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.handleUpdateClick();
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
    }
    
    // componentWillMount() { // Deprecado en versiones actuales
    //     console.log("UNSAFE componentWillMount");
    // }
    // componentWillUpdate(nextProps, nextState) { // Deprecado en versiones actuales
    //     console.log("UNSAFE componentWillUpdate");
    // }

    handleUpdateClick = () => {
        console.log("handleUpdateClick");
        const api_weather = getUrlWeatherByCity(this.state.city);

        fetch(api_weather).then( resolve => {
            return resolve.json();
        }).then( data => {
            console.log("Resultado del handleUpdateClick");
            const newWeather = transfromWeather(data);
            this.setState({
                data: newWeather
            });
            console.log(data);
        });

        /*this.setState({
            city: 'San Juan',
            data: data2
        });*/
    }

    render() {
        console.log("render");
        const { onWeatherLocationClick } = this.props;
        const { city, data } = this.state;

        return (
            <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
                <Location city={city}></Location>
                {data ? 
                    <WeatherData data={data}></WeatherData> : 
                    <CircularProgress />
                }
            </div>
        );
    }
};
WeatherLocation.propsTypes = {
    city: PropTypes.string,
    onWeatherLocationClick: PropTypes.func
};
export default WeatherLocation;