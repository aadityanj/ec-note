import React from 'react';
import { Button, Icon, Form, TextArea, Grid} from 'semantic-ui-react';
import * as moment from 'moment';

const Note = ({handleClickEvent, handleChangeEvent, item, index}) => (
        <div className={item.isMax ? 'note fullscreen': 'note' } > 
            <div className="note-header">
                <input type="text" placeholder="title" value={item.title} id={'note-title'+index} onChange = {(e)=>handleChangeEvent(e, item.id, index, 'title')}  className="note-title float-left" />
                <Button.Group className="float-right">
                    {item.loading && 
                    <Button icon className="note-action">
                        <Icon loading name='spinner' />
                    </Button>
                    }
                    {  item.isMax &&
                    <Button icon className="note-action" onClick={(e)=>handleClickEvent(e, item.id, index, 'min')}>
                        <Icon name="window minimize outline" />
                    </Button> 
                    }
                    {  item.isMax &&
                    <Button icon className={item.isHistory ? 'note-action active': 'note-action'}   onClick={(e)=> handleClickEvent(e, item.id, index, 'history')  }>
                        <Icon name="history" />
                    </Button> 
                    }
                    { !item.isMax &&
                    <Button icon className="note-action" onClick={(e)=>handleClickEvent(e, item.id, index, 'max')}>
                        <Icon name="window maximize" />
                    </Button>
                    }
                    <Button icon className="note-action" onClick={(e)=> handleChangeEvent(e, item.id, index, 'save')} >
                        <Icon name='save' />
                    </Button>
                    <Button icon className="note-action" onClick={(e)=>handleClickEvent(e, item.id, index, 'trash')}>
                        <Icon name='trash' />
                    </Button>
                </Button.Group>
            </div>
            <div className="note-text">
                 <TextArea className={item.isHistory && item.isMax ? 'note-textarea history' : 'note-textarea' } value={item.notes} id={'note-note'+index} onChange = {(e)=> handleChangeEvent(e, item.id, index, 'note')} placeholder='Take a note!'></TextArea>
                 { item.isHistory && item.isMax &&
                 <div className="history historylist">
                    <div className="historyheader">
                        Revisions
                    </div>
                    <div className="revisionlist">
                      { item.history.map( (history, hIndex) => {
                         return <div className={history.active? 'history-active': ''} key={hIndex} onClick={(e) => handleClickEvent(e, index, hIndex, 'restoreHistory')}>
                            { moment(history.updatedAt).format('DD MMM YYYY hh:mm a') }
                         </div>
                      })
                       
                      }
                    </div>
                 </div>     
                 }  
            </div>
        </div>
)


export default Note;