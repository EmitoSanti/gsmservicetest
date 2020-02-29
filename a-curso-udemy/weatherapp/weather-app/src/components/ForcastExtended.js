import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import transformForecast from '..//services/transformForecast';
import './styles.css';
import {
    CLOUD,
    SUN,
    RAIN,
    SNOW,
    THUNDER,
    DRIZZLE
} from '../constants/weathers';

const data = {
    temperature: 5,
    weatherState: RAIN,
    humidity: 10,
    wind: 10
};
const days = [
    'lunes',
    'martes',
    'viernes'
];



class ForcastExtended extends Component {
    constructor() {
        super();

        this.state = { forecastData: null};
    }

    componentDidMount() {
        console.log("componentDidMount ForcastExtended");
        this.updateCity(this.props.city);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.city !== this.props.city) {
            this.setState({ forcastData: null });
            this.updateCity(nextProps.city);
        }
    }

    updateCity = city => {
        console.log("updateCity ");
        
    }

    renderForecastItemDays(forcastData) {
        return forcastData.map( 
            forcast => ( <ForecastItem key={`${forcast.weekDay}${forcast.hour}`}
                            weekDay={forcast.weekDay} 
                            hour={forcast.hour} 
                            data={forcast.data}/> )
        );
    }
    renderProgress() {
        return (<CircularProgress />);
    }
    render() {
        const { city } = this.props;
        const { forecastData } = this.state;
        return (
            <div>
                <h2 className='forcast-title'>Pronostico Extendido para {city}</h2>
                {forecastData ? this.renderForecastItemDays(forecastData) : this.renderProgress()}
            </div>
        );
    }
}

ForcastExtended.propsTypes = {
    city: PropTypes.string.isRequired
};

export default ForcastExtended;