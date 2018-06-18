import React, { Component } from 'react';
import { Container, Button, Icon, Form, Grid, TextArea  } from 'semantic-ui-react';

export class Note extends React.Component {
    
    render() {
        return (
            <Container>
            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                { this.props.notes.map(function (i) {
                   return <Grid.Column key={i.id}>
                        <div className="note">
                            <div className="note-header">
                                <input type="text" placeholder="title"  className="note-title float-left" />
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
    }
}

export default Note;