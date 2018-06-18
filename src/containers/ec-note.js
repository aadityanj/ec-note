import React, { Component } from 'react';
import { Container, Button, Icon, Form, Confirm, Grid   } from 'semantic-ui-react';
import Navbar from './navbar';
import { getUser, getNotes, createNote, moveToTrash, updateNote} from './../api'
import { setUser } from '../actions';
import Note from '../components/notes';
import { isNotEmpty } from '../utils/validator';
import _ from 'lodash';

class EcNote extends Component {

    constructor(props){
        super(props);  
        this.store = this.props.store;
        this.state = {
            visibleForm: false,
            notes: [],
            createNote: '',
            deleteNoteId: '',
            deleteNoteIndex: '',
            confirmMsg: false,
            timer: '',
            timerStatus: false,
            focussedNoteId: '',
            focussedNoteIndex: ''
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateNote = this.handleCreateNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.closeConfirmMsg = this.closeConfirmMsg.bind(this);
        this.deleteConfirmMsg = this.deleteConfirmMsg.bind(this);
        this.handleChangeNote = this.handleChangeNote.bind(this);
    }

    componentDidMount(){
        let token = sessionStorage.getItem("token");
        getUser(token).then( res => {
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
                <Navbar {...this.props}  state={this.state}/>
                <Container className="note-head">
                    <div className="add-dropdown">
                        <button className="add-btn"  onClick={this.toggleMenu}><Icon fitted name='add' /> <span>New</span></button>
                        <div  className={ this.state.visibleForm ? "create-note displayBlock" : "create-note displayNone"}>
                        <Form>
                            <Form.Field>
                                <input placeholder='title' id="createNote" value={this.state.createNote} onChange={this.handleChange}   name="title"  />
                            </Form.Field>
                            <Button className="w-100 s-btn" type='submit' onClick={this.handleCreateNote} >Create</Button>
                        </Form>
                        </div>
                     </div>               
                    <h2 className="ec-h2"><span>Notes</span></h2>
                </Container>
                <Container>
                    <Grid divided='vertically' >
                       <Grid.Row columns={3}>
                            { 
                                this.state.notes.map( (item, index) => {
                                   return <Grid.Column key={index}>
                                        <Note 
                                            handleDeleteNote={this.handleDeleteNote} 
                                            onChangeNote={this.handleChangeNote}
                                            item = {item}
                                            index = {index}
                                        />
                                        </Grid.Column>   
                                })
                            } 
                        </Grid.Row>
                    </Grid>
                </Container>
                <Confirm size="tiny" open={this.state.confirmMsg} content="Are you sure move to trash ?" onCancel={this.closeConfirmMsg} onConfirm={this.deleteConfirmMsg} />
            </div>
        )
    }

    handleChange(e) {
        let target = e.target;
        let v = target.id;
        this.setState({
            [v]: target.value
        });
    }
    

    handleCreateNote() {
        if(isNotEmpty(this.state.createNote) == "success"){
            createNote({title:this.state.createNote}).then( res => {
                if (res.status == 200) {
                    this.setState({ ['notes'] : [res.data, ...this.state.notes] })
                    alert('Created');
                    this.setState({visibleForm: !this.state.visibleForm, createNote: ''})
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

    timeout;

    handleChangeNote(e, itemId, index, type){
        let target = e.target;
        let note = _.clone(this.state.notes);
        if(type == "title") {
            note[index].title = target.value;
        } else {
            note[index].notes = target.value;
        }
        this.setState({
            notes: note,
            focussedNoteId: itemId,
            focussedNoteIndex: index
        })
        console.log(this.state.timerStatus);
        if (this.state.timerStatus) {
            //console.log("timer starts");
            this.setState(()=> clearTimeout(this.timeout));
            // clearTimeout(this.timeout);
        }
        this.setState({ timerStatus: true, timer: ''});
        let timer = setTimeout(function(){
            let note = _.clone(this.state.notes);
            note[index].loading = true;
            this.setState({
                notes: note
            });
            let request = {};
            request.title = note[index].title;
            request.notes = note[index].notes;
            updateNote(note[index].id, request).then(res => {
                //console.log("api calls");
                setTimeout( function() { 
                    note[index].loading = false;
                    if(res.status === 200) {                        
                        this.setState({
                            notes: note,
                            timerStatus: false
                        });
                    }
                }.bind(this), 500);   
            }); 
        }.bind(this), 200);
        this.setState( () => {  this.timeout = timer });
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
}


export default EcNote;