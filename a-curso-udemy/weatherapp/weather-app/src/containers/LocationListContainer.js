import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LocationList from './../components/LocationList';
import { setCity } from './../actions';

class LocationListContainer extends Component {
  handleWeatherLocation = city => {
    console.log(`handleWeatherLocation ${city}`);
    this.props.setCity(city);
  }

  render(){
    return (
        <LocationList cities={this.props.cities} onSelectedLocation={this.handleWeatherLocation}/>
    );
  }
}

LocationListContainer.propTypes = {
  setCity: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired
};

const mapDispatchToPropsActions = dispatch => (
  {
    setCity: value => dispatch(setCity(value))
  }
);
export default connect(null, mapDispatchToPropsActions)(LocationListContainer);
