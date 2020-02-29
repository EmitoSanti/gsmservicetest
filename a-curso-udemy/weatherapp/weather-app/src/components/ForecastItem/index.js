import React from 'react';
import PropTypes from 'prop-types';
import WeatherData from '../WeatherLocation/WeatherData';
import CircularProgress from '@material-ui/core/CircularProgress';

const ForecastItem = ({ weekDay , hour, data }) => {
    return (
            <div>
                <div>{weekDay} - {hour} hs</div>
                {data ? <WeatherData data={data}></WeatherData> : <CircularProgress />}
            </div>
        );
};

ForecastItem.propTypes = {
    weekDay: PropTypes.string.isRequired,
    hour: PropTypes.number.isRequired,
    data: PropTypes.shape({
        temperature: PropTypes.number.isRequired,
        weatherState: PropTypes.string.isRequired,
        humidity: PropTypes.number.isRequired,
        wind: PropTypes.number.isRequired
    })
};

export default ForecastItem;