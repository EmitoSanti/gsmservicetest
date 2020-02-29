import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import LocationListContainer from './containers/LocationListContainer';
import ForcastExtendedContainer from './containers/ForcastExtendedContainer';

import './App.css';

const cities = [
  'Buenos Aires,ar',
  'Mendoza,ar',
  'Liverpool,gb',
  'Washington dc,us',
  'Bogota,col',
  'Madrid,es'
];

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant='h4' color='inherit'>
                Weather App
              </Typography>
            </Toolbar>
          </AppBar>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <div className="App">
              <LocationListContainer cities={cities}/>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <Paper elevation={4}>
              <div className="details">
                <ForcastExtendedContainer />
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
