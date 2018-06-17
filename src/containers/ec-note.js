import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Button, Icon, Form, Grid, TextArea  } from 'semantic-ui-react';
import '../index.css'
import Navbar from './navbar';
import {getUser} from './../api/index'
import { connect } from 'react-redux'
import { setUser } from '../actions';

class EcNote extends Component {

    constructor(props){
        super(props);  
        this.props = props;
        this.store = this.props.store;
    }



    componentDidMount(){
        let token = sessionStorage.getItem("token");
        getUser(token)
            .then( res => {
                if(res.status == 200){
                    this.setState({
                        ['user'] : res.data
                    })
                    this.store.dispatch(setUser(res.data));
                } else {
                    sessionStorage.setItem("token", "");
                    this.props.history.push("/login");
                }
            })
            .catch( err => {
                console.log(err);
                sessionStorage.setItem("token", "");
                this.props.history.push("/login");
            });
    }
    
    render() {
        return (
            <div>
                <style>{`
                h2 {
                    width: 100%; 
                    text-align: center; 
                    border-bottom: 1px solid rgba(0,0,0,0.1); 
                    line-height: 0.1em;
                    margin: 10px 0 20px; 
                    color: #877457;
                    font-family: 'Roboto-Light'
                } 

                h2 span { 
                    background: #f6f2ef; 
                    padding:0 10px; 
                }

                .mt-10{
                    margin-top: 45px;
                }

                .add-btn{
                    bottom: -30px !important;
                    background: #fff !important;
                    border-radius: 20px;
                    position:relative;
                    padding: 10px;
                    padding-right: 15px;
                }

                .add-btn i{
                    background: #fff !important;
                    color: #00b5ad !important;
                }

                button.add-btn{
                    padding-left: 1rem !important;
                }

                button.add-btn:focus{
                    outline: 0 !important;
                    outline-offset: 0  !important;
                    background-image: none  !important;
                    -webkit-box-shadow: none !important;
                    box-shadow: none  !important;
                }
                
                .add-dropdown{
                    position:relative;
                }

                .create-note{
                    position: absolute;
                    top: 80px;
                    background: #fff;
                    display: none;
                    padding: 15px;
                    width: 250px;
                    border-radius: 10px;
                }

                .w-100{
                    width: 100% !important;
                }

                .ui.s-btn{
                    background: #00b5ad;
                    color: #fff;
                }
                
                .note-head{
                    height: 80px;
                }

                .note{
                    height: 400px;
                    background: #fff;
                }

                .note-header{
                    height: 34px;
                    padding-left: 10px;
                    background: bisque;
                }

                .note-text{

                }

                .note-title{
                    height: 100%;
                    background: transparent;
                    border-style: none;
                    width: 190px
                }

                .float-left{
                    float:left;
                }

                .float-right{
                    float:right;
                }

                .ui.buttons .button.note-action{
                    padding: 8px; 
                    background: transparent;
                }
                .note-textarea{
                    height: 366px;
                }
                `}</style>
                
                <Navbar   {...this.props} />

                <Container className="note-head">
                    <div className="add-dropdown">
                        <button className="add-btn"><Icon fitted name='add' /> <span>New</span></button>
                        <div className="create-note">
                        <Form>
                            <Form.Field>
                                <input placeholder='Title' />
                            </Form.Field>
                            <Button className="w-100 s-btn" type='submit'>Create</Button>
                        </Form>
                        </div>
                    </div>               
                    <h2><span>Notes</span></h2>
                </Container>
                <Container>
                    <Grid divided='vertically'>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <div className="note">
                                    <div className="note-header">
                                        <input type="text" placeholder="title" className="note-title float-left" />
                                        <Button.Group className="float-right">
                                            <Button icon className="note-action">
                                                <Icon name='save' />
                                            </Button>
                                            <Button icon className="note-action">
                                                <Icon name='delete' />
                                            </Button>
                                        </Button.Group>
                                    </div>
                                    <div className="note-text">
                                        <Form>
                                            <TextArea className="note-textarea" placeholder='Tell us more' />
                                        </Form>
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="note">
                                    <div className="note-header">
                                        <input type="text" placeholder="title" className="note-title float-left" />
                                        <Button.Group className="float-right">
                                            <Button icon className="note-action">
                                                <Icon name='save' />
                                            </Button>
                                            <Button icon className="note-action">
                                                <Icon name='delete' />
                                            </Button>
                                        </Button.Group>
                                    </div>
                                    <div className="note-text">
                                        <Form>
                                            <TextArea className="note-textarea" placeholder='Tell us more' />
                                        </Form>
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="note">
                                    <div className="note-header">
                                        <input type="text" placeholder="title" className="note-title float-left" />
                                        <Button.Group className="float-right">
                                            <Button icon className="note-action">
                                                <Icon name='save' />
                                            </Button>
                                            <Button icon className="note-action">
                                                <Icon name='delete' />
                                            </Button>
                                        </Button.Group>
                                    </div>
                                    <div className="note-text">
                                        <Form>
                                            <TextArea className="note-textarea" placeholder='Tell us more' />
                                        </Form>
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}


export default EcNote;