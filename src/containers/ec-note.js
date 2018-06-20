import React, { Component } from 'react';
import { Container, Button, Icon, Form, Confirm, Grid   } from 'semantic-ui-react';
import Navbar from './navbar';
import { getUser, getNotes, createNote, moveToTrash, updateNote, getHistory} from './../api'
import { setUser } from '../actions';
import Note from '../components/notes';
import { isNotEmpty } from '../utils/validator';
import _ from 'lodash';
import moment from 'moment';

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
            focussedNoteIndex: '',
            history: [],
            prvhistoryIndex: ''
        }
        this.timeout
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateNote = this.handleCreateNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.closeConfirmMsg = this.closeConfirmMsg.bind(this);
        this.deleteConfirmMsg = this.deleteConfirmMsg.bind(this);
        this.handleChangeNote = this.handleChangeNote.bind(this);
        this.handleMaxMin = this.handleMaxMin.bind(this);
        this.toggleHistory = this.toggleHistory.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleClickEvent = this.handleClickEvent.bind(this);
        this.selectedHistory = this.selectedHistory.bind(this);
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
                    ['notes']: res.data
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
                                            handleClickEvent={this.handleClickEvent} 
                                            handleChangeEvent={this.handleChangeNote}
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

    /* Handling Events from Notes */

    handleClickEvent(itemId, index, action) {
        switch (action) {
            case 'trash':  this.handleDeleteNote(itemId, index); break;
            case 'history': this.toggleHistory(itemId, index, 'default'); break;
            case 'max': this.handleMaxMin(itemId, index, action); break;
            case 'min': this.handleMaxMin(itemId, index, action); break; 
            case 'selectHistory': this.selectedHistory(itemId, index); break;
        }
    }

    handleChangeEvent(event, itemId, index, action) {
        switch (action) {
            case  'title': this.handleChangeNote(event, itemId, index, action); break;
            case  'note': this.handleChangeNote(event, itemId, index, action); break;
            case  'save': this.handleChangeEvent(event, itemId, index, action); break;
        }
    }
    
    handleMaxMin(id, index, action) {
        console.log("setting maxMizedNote");
        let note = _.clone(this.state.notes);
        if (action == "max") {
            note[index].isMax = true
            this.setState({
                notes: note
            })
        } else {
            note[index].isMax = false
            note[index].isHistory = false;
            if(note[index].history) {
                note[index].notes = note[index].history[0].revisedNote;
            }
            this.setState({
                notes: note
            })
        }
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

    handleChangeNote(e, itemId, index, action){
        let target = e.target;
        let note = _.clone(this.state.notes);
        if(action == "title") {
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
        if(action == "save") {
            let note = _.clone(this.state.notes);
            note[index].loading = true;
            this.setState({
                notes: note
            });;
            let request = {};
            request.title = note[index].title;
            request.notes = note[index].notes;
            updateNote(note[index].id, request).then(res => {
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
            return false;   
        }


        if (this.state.timerStatus) {
            this.setState(()=> clearTimeout(this.timeout));
        }

        this.setState({ timerStatus: true, timer: ''});
        let timer = setTimeout(
            function () {
                let note = _.clone(this.state.notes);
                note[index].loading = true;
                this.setState({
                    notes: note
                });;
                let request = {};
                request.title = note[index].title;
                request.notes = note[index].notes;
                updateNote(note[index].id, request).then(res => {
                    setTimeout( function() { 
                        note[index].loading = false;
                        if(res.status === 200) {                        
                            this.setState({
                                notes: note,
                                timerStatus: false
                            });
                        }
                    }.bind(this)
             , 500);   
            }); 
        }.bind(this), 500);
        this.setState( () => {  this.timeout = timer });

        if (note[index].isHistory && action === "note") {
            let lastupdates = moment.utc(note[index].history[0].updatedAt).format("mm");
            let currentdates = moment.utc().format("mm");
            console.log("time difference",lastupdates);
            if ( currentdates - lastupdates > 1 ) {
                console.log("Editing in same index and time diff > 1");
                let newHistory = {};
                newHistory.revisedNote = target.value;
                newHistory.updatedAt = moment();
                console.log("TargetValue" ,target.value);
                note[index].history[this.state.prvhistoryIndex].active = false;
                let newN = [newHistory, ...note[index].history];
                note[index].history = newN;
                note[index].isHistory = true;
                note[index].history[0].active = true;
                this.setState({
                    notes: note,
                    prvhistoryIndex: 0
                })
            } else {
                console.log("Editing in same index and time diff < 1");
                note[index].history[this.state.prvhistoryIndex].active = false;
                note[index].history[0].active = true;
                note[index].history[0].revisedNote = target.value;    
                this.setState({
                    notes: note,
                    prvhistoryIndex: 0
                })
            }
        }
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

    selectedHistory(index, hIndex) {
        console.log("restoring" + index, hIndex);
        let note = _.clone(this.state.notes);
        note[index].history[this.state.prvhistoryIndex].active = false;
        note[index].notes = note[index].history[hIndex].revisedNote;  
        note[index].history[hIndex].active = true;
        console.log( note[index].history[hIndex].revisedNote );
        this.setState({
            notes: note,
            prvhistoryIndex: hIndex
        })
    }

    toggleHistory(itemId, index, action) {
        let note = _.clone(this.state.notes);
        if(action === 'default')
             note[index].isHistory = !note[index].isHistory
        else
            note[index].isHistory = true;     
        if(note[index].isHistory){
            getHistory(note[index].id).then( res => {
                if(res.status === 200) {
                    note[index].history = res.data;
                    note[index].history[0].active = true;
                    this.setState({
                        notes: note,
                        prvhistoryIndex : 0
                    })
                 }
            });
        }  else{
            this.setState({
                notes: note
            })
        }
    }
}


export default EcNote;