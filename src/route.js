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
import { createStore } from 'redux';
import ecNote  from './reducers/index';


const store = createStore(ecNote)


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
          isAuthenticated()? (
          <Component {...props} store={store} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
);

const isAuthenticated = () => {
    if(sessionStorage.getItem('isAuthenticated')){
        return true;
    }else {
        return false;
    }
}

class RouterComponent extends Component {

    constructor(props){
        super(props);
        this.store = this.props.store;
    }
  
  render() {
    return (
            <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/ec-note" />
                    </Route>
                    <PrivateRoute exact store={this.store} path="/ec-note" component={EcNote} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                </Switch>
            </div>
        </Router>
    );
  }
}

export default RouterComponent;
