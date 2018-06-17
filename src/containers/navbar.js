import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Grid, Image, Icon, Divider, Confirm} from 'semantic-ui-react';
import logo from './../assets/images/logo.png';
import './../index.css'
import { Dropdown, Menu } from 'semantic-ui-react'


class Navbar extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.store = this.props.store;
        this.state = {
            label: ''
        }
        let state = this.store.getState().user;
        this.store.subscribe(() => {
            let state = this.store.getState().user;
            console.log(state);
            if(state.firstName && state.lastName){  
                let t = state.firstName.split('')[0] + state.lastName.split('')[0];
                this.setState({
                    ['label']: t
                })
                console.log(t);
             }
        });
        this.handleLogout = this.handleLogout.bind(this);

    }

    handleLogout(){
        sessionStorage.setItem('isAuthenticated', false);
        this.props.history.push("/login");
    }


    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column floated='left'>
                        <Image src={logo} size='mini' className="nav-left" />
                    </Grid.Column>
                    <Grid.Column  textAlign='center' width={4}>
                        <div className="nav-tray">
                            <div className="float-left tray-item"> <Icon fitted name='home' /> <span className="tray_name"> Home </span> </div>
                            <div className="float-left tray-item"> <Icon fitted name='folder open' /> <span className="tray_name"> Recents </span> </div>
                            <div className="float-left"> <Icon fitted name='trash' /> <span className="tray_name"> Trash </span> </div>
                        </div>
                    </Grid.Column> 
                    <Grid.Column floated='right'>
                        <Dropdown pointing text={this.state.label} className="username">  
                        <Dropdown.Menu>
                            <Dropdown.Item>Profile Settings</Dropdown.Item>
                            <Dropdown.Item  onClick={this.handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>    
                        </Dropdown>
                    </Grid.Column>  
                </Grid>
            </div>
        )
    }
}

export default Navbar;