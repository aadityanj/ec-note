import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Button, Icon, Form, Confirm   } from 'semantic-ui-react';
import '../index.css'
import Navbar from './navbar';
import { getUser, getNotes, createNote, moveToTrash} from './../api'
import { setUser } from '../actions';
import Note from '../components/notes';
import { isNotEmpty } from '../utils/validator';
import _ from 'lodash';

class EcNote extends Component {

    constructor(props){
        super(props);  
        this.props = props;
        this.store = this.props.store;
        this.state = {
            visibleForm: false,
            notes: [],
            createNote: {
                title: ''
            },
            deleteNoteId: '',
            deleteNoteIndex: '',
            confirmMsg: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateNote = this.handleCreateNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.closeConfirmMsg = this.closeConfirmMsg.bind(this);
        this.deleteConfirmMsg = this.deleteConfirmMsg.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let v = target.id;
        this.setState({ createNote: {
            title: target.value
        }});
    }

    handleCreateNote() {
        if(isNotEmpty(this.state.createNote.title) == "success"){
            createNote(this.state.createNote)
                .then( res => {
                    if(res.status == 200) {
                        this.setState({ ['notes'] : [res.data, ...this.state.notes] })
                        alert('Created');
                        this.setState({visibleForm: !this.state.visibleForm})
                    }
                });
        }else {
            return false;
        }
    }

    handleDeleteNote(id, index) {
        this.setState({
            deleteNoteId: id,
            deleteNoteIndex: index,
            confirmMsg: true
        })
    }

    closeConfirmMsg(){
        this.setState({
            deleteNoteId: '',
            confirmMsg: false
        })
    }

    deleteConfirmMsg(){
        this.setState({ confirmMsg: false})
        moveToTrash({id: this.state.deleteNoteId})
        .then( (res) => {
            if(res.status === 200) {
                let newNote =[...this.state.notes.slice(0, this.state.deleteNoteIndex), ...this.state.notes.slice(this.state.deleteNoteIndex + 1 )];
                this.setState({ delelteNoteId: '', notes: newNote})
                alert("Moved to trash");
            }
        });
    }

    toggleMenu() {
        this.setState({visibleForm: !this.state.visibleForm})
    }

    createNote() {
        console.log("creating");
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
                                <input placeholder='title' value={this.state.createNote.title} onChange={this.handleChange}  id="title" name="title"  />
                            </Form.Field>
                            <Button className="w-100 s-btn" type='submit' onClick={this.handleCreateNote} >Create</Button>
                        </Form>
                        </div>
                     </div>               
                    <h2 className="ec-h2"><span>Notes</span></h2>
                </Container>
                <Note  handleDeleteNote={this.handleDeleteNote} notes={this.state.notes}/>
                <Confirm size="tiny" open={this.state.confirmMsg} content="Are you sure move to trash ?" onCancel={this.closeConfirmMsg} onConfirm={this.deleteConfirmMsg} />
            </div>
        )
    }
}


export default EcNote;