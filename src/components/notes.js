import React from 'react';
import { Container, Button, Icon, Form, Grid, TextArea  } from 'semantic-ui-react';

const Note = ({notes, handleDeleteNote}) => (
            <Container>
            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                { notes.map( (i, index) => {
                   return <Grid.Column key={index}>
                        <div className="note">
                            <div className="note-header">
                                <input type="text" placeholder="title"   className="note-title float-left" />
                                <Button.Group className="float-right">
                                    <Button icon className="note-action">
                                        <Icon name='save' />
                                    </Button>
                                    <Button icon className="note-action" onClick={()=>handleDeleteNote(i.id,index)}>
                                        <Icon name='trash' />
                                    </Button>
                                </Button.Group>
                            </div>
                            <div className="note-text">
                                <Form>
                                    <TextArea className="note-textarea" placeholder='Tell us more'></TextArea>
                                </Form>
                            </div>
                        </div>
                    </Grid.Column>
                })
                }
                </Grid.Row>
            </Grid>
        </Container>
        )


export default Note;