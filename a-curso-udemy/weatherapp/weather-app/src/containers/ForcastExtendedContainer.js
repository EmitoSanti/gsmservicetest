import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ForcastExtended from './../components/ForcastExtended';

class ForcastExtendedContainer extends Component {
    render() {
        return (
            <div>   
                 {this.props.city && <ForcastExtended city={this.props.city}/>}
            </div>
           
        );
    }
}

ForcastExtendedContainer.propsTypes = {
    city: PropTypes.string.isRequired
};


const mapStateToProps = ({ city }) => ({ city });
export default connect(mapStateToProps, null)(ForcastExtendedContainer);