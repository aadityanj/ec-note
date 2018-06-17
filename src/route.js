import React, { Component } from 'react';
import Login from './containers/login';
import SignUp from './containers/signup';
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
                    <Redirect to="/login" />
                </Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Switch>
        </div>
    </Router>
    );
  }
}

export default RouterComponent;
