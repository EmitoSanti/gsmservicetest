import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const WeatherExtraInfo = ({ humidity, wind }) => (
    <div className="weatherExtraInfoCont">
        <span className="extraInfoText">{`Humedad ${wind} %`}</span>
        <span className="extraInfoText">{`Vientos: ${humidity} m/s`}</span>
    </div>
);

WeatherExtraInfo.propTypes = {
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
};

export default WeatherExtraInfo;