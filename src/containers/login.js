import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from './../assets/images/logo.png';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    handleClick(){
        history.push("/signup");
        window.location.reload();
    } 

    render() {
        return (
            <div className='login-form'>
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
                    background: #f7f7f7;
                }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                    <Image src={logo} /> Log-in to your account
                    </Header>
                    <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        />

                        <Button color='teal' fluid size='large'>
                        Login
                        </Button>
                    </Segment>
                    </Form>
                    <Message>
                    New to us? <a href='/signup'>Sign Up</a>
                    </Message>
                </Grid.Column>
                </Grid>
            </div>
        )
    }
   
}

export default Login;