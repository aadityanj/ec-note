import React from 'react';
import { Button, Icon, Form, TextArea  } from 'semantic-ui-react';

const Note = ({handleDeleteNote, onChangeNote, item, index}) => (
        <div className="note"> {item.loading}
            <div className="note-header">
                <input type="text" placeholder="title" value={item.title} id={'note-title'+index} onChange = {(e)=>onChangeNote(e, item.id, index, 'title')}  className="note-title float-left" />
                <Button.Group className="float-right">
                    {item.loading && 
                    <Button icon className="note-action">
                        <Icon loading name='spinner' />
                    </Button>
                    }
                    <Button icon className="note-action">
                        <Icon name='save' />
                    </Button>
                    <Button icon className="note-action" onClick={()=>handleDeleteNote(item.id,index)}>
                        <Icon name='trash' />
                    </Button>
                </Button.Group>
            </div>
            <div className="note-text">
                <Form>
                    <TextArea className="note-textarea" value={item.notes} id={'note-note'+index} onChange = {(e)=> onChangeNote(e, item.id, index, 'note')} placeholder='Take a note!'></TextArea>
                </Form>
            </div>
        </div>
)


export default Note;