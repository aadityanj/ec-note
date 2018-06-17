import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Grid, Image, Icon, Divider, Confirm} from 'semantic-ui-react';
import logo from './../assets/images/logo.png';
import '../index.css'
import { Dropdown, Menu } from 'semantic-ui-react'

class Navbar extends Component {
    render() {
        return (
            <div>
                {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
                */}
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                body {
                    background: #f6f2ef;
                }
                .nav-tray{
                    width: 286px;
                    margin-top: 1rem;
                    display: inline-block;
                }
                .tray-item{
                    margin-right: 35px;
                }

                .nav-tray i{
                    font-size: 18px;
                    color: rgba(0,0,0,0.7);
                }
                .tray_name {
                    font-size: 16px;
                    font-weight: bold;
                    margin-left :3px;
                    color: rgba(0,0,0,0.7);
                    font-family: 'Roboto-bold'
                }
                .float-left{
                    float: left;
                }
                .nav-left {
                    margin-top: 10px !important;
                    margin-left :10px !important;
                }
                .username {
                    background: #910bfe;
                    width: 30px;
                    height: 30px;
                    margin-top: 10px;
                    padding-top: 6px;
                    margin-right: 20px;
                    color: white;
                    font-family: 'Roboto-Light';
                    border-radius: 20px;
                    text-align: center;
                }
                
                .ui.dropdown.username .menu{
                    right: 0 !important;
                    left: initial !important;
                }
                .ui.dropdown.username i{
                   display: none !important;
                }
                .ui.dropdown.username {
                   text-align: center !important;
                }
                .ui.dropdown.username .menu::after{
                    left: 80% !important;
                }
                .ui.dropdown.username {
                    font-family: 'Roboto-Light'
                }

                `}</style>
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
                        <Dropdown pointing text="AN" className="username">  
                        <Dropdown.Menu>
                            <Dropdown.Item>Profile Settings</Dropdown.Item>
                            <Dropdown.Item>Logout</Dropdown.Item>
                        </Dropdown.Menu>    
                        </Dropdown>
                    </Grid.Column>  
                </Grid>
               
            </div>
        )
    }
}

export default Navbar;