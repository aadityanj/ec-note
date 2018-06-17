import React, { Component } from 'react';
import Login from './containers/login';
import SignUp from './containers/signup';
import EcNote from './containers/ec-note';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import {Switch} from 'react-router';

class RouterComponent extends Component {
  render() {
    return (
        <Router>
        <div>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/ec-note" />
                </Route>
                <Route exact path="/ec-note" component={EcNote} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Switch>
        </div>
    </Router>
    );
  }
}

export default RouterComponent;
