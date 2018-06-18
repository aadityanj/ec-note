import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Button, Icon, Form, Grid, TextArea  } from 'semantic-ui-react';
import '../index.css'
import Navbar from './navbar';
import { getUser, getNotes} from './../api/index'
import { setUser } from '../actions';
import Note from '../components/notes';

class EcNote extends Component {

    constructor(props){
        super(props);  
        this.props = props;
        this.store = this.props.store;
        this.state = {
            visibleForm: false,
            notes: []
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({visibleForm: !this.state.visibleForm})
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

        getNotes().then( (res) => {
            if(res.status == 200) {
                console.log(res.data);
                this.setState({
                    'notes': res.data
                })
            }
        }).catch( (err) => {
            console.log(err);
        });
    }
    
    render() {
        return (
            <div>
                <Navbar {...this.props} />
                <Container className="note-head">
                    <div className="add-dropdown">
                        <button className="add-btn"  onClick={this.toggleMenu}><Icon fitted name='add' /> <span>New</span></button>
                        <div  className={ this.state.visibleForm ? "create-note displayBlock" : "create-note displayNone"}>
                        <Form>
                            <Form.Field>
                                <input placeholder='Title' />
                            </Form.Field>
                            <Button className="w-100 s-btn" type='submit'>Create</Button>
                        </Form>
                        </div>
                     </div>               
                    <h2 className="ec-h2"><span>Notes</span></h2>
                </Container>
                <Note notes={this.state.notes}/>
            </div>
        )
    }
}


export default EcNote;