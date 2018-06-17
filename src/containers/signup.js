import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from './../assets/images/logo.png';
import { signUpValidator } from '../utils/utils.validate';

class SignUp extends Component {
    constructor(props){
    super(props);
        this.state={
            notify: 'hidden',
            msg: '',
            notifyHeader: '',
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        let target = e.target;
        let v = target.id;
        this.setState({[v]: target.value});
    }
    
    handleSubmit() {
       let user  = this.state;
       let validatedResult = signUpValidator(user.firstName, user.lastName, user.emailId, user.userName, user.password);
       if(validatedResult.valid) {

       } else {
        this.setState({
            ['notify']: 'error',
            ['notifyHeader']: 'There was some errors with your submission',
            ['msg']: validatedResult.errMsg
        });
       }
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
                    <Image src={logo} /> Sign up to your account
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid icon='user'  id="firstName" value={this.state.firstName} onChange={this.handleChange}  iconPosition='left' placeholder='First Name' />
                        <Form.Input fluid icon='user'  id="lastName" value={this.state.lastName} onChange={this.handleChange}  iconPosition='left' placeholder='Last Name' />
                        <Form.Input fluid icon='mail'  id="emailId" value={this.state.emailId} onChange={this.handleChange}  iconPosition='left' placeholder='Email' />
                        <Form.Input fluid icon='user circle'  id="userName" value={this.userName} onChange={this.handleChange}  iconPosition='left' placeholder='User Name' />
                        <Form.Input fluid icon='lock'  id="password" value={this.state.password} onChange={this.handleChange}  iconPosition='left' placeholder='Password' type='password' />
                        <Button color='teal' fluid size='large'>  Login </Button>
                    </Segment>
                    </Form>
                    <Message
                        error = {this.state.notify === 'error'}
                        hidden = {this.state.notify === 'hidden'}
                        header = {this.state.notifyHeader}
                        list={[this.state.msg]}
                    />
                    <Message>
                    Already have an account? <a href='/login'>Login</a>
                    </Message>
                </Grid.Column>
                </Grid>
            </div>
        )
    }
   
}

export default SignUp;