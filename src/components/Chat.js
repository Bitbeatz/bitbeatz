import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Avatar, Fab, Grid, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, TextField } from '@material-ui/core'
import { Send as SendIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'firebase'

import { db } from '../firebase/firebase'


const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    send: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    list: {
        margin: '10px',
        maxHeight: '232px',
        overflow: 'auto',
        backgroundColor: 'white',
        padding: 0
    },
    chatText: {
        overflowWrap: 'break-word'
    }
}))

const Chat = (props) => {
    const classes = useStyles()
    const { messages = [], projectId = '', user = '' } = props
    const [currentMessage, setCurrentMessage] = useState('')

    const handleMessageUpdate = ({ target }) => {
        setCurrentMessage(target.value)
    }

    const handleSendMessage = () => {
        db.collection('projects').doc(projectId).update({
            chatMessages: firebase.firestore.FieldValue.arrayUnion({
                text: currentMessage,
                user,
                time: Date.now(),
            }),
        })
            .then(() => {
                setCurrentMessage('')
            })
            .catch(e => console.error(e))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && currentMessage) {
            handleSendMessage()
        }
    }

    const render = () => (
        <Grid>
            <List dense={true} className={classes.list}>
                <ListSubheader>Chat</ListSubheader>
                { messages.map(message => {
                    // const date = new Date(message.time)
                    // const hours = date.getHours()
                    // const minutes = date.getMinutes()
                    if (message.text) {
                        return <ListItem key={message.time}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>{ message.user[0].toUpperCase() }</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                align={user === message.user ? 'right' : 'left'}
                                secondary={message.text}
                                className={classes.chatText}
                            />
                            { /* <Grid item xs={12}>
                                <ListItemText align="right" primaryTypographyProps={{ variant: 'body2' }} secondary={`${hours}:${minutes}`}></ListItemText>
                            </Grid> */ }
                        </ListItem>

                    }
                }) }
            </List>
            <Grid container style={{padding: '20px'}}>
                <Grid item xs={9}>
                    <TextField
                        id="standard-message"
                        label="Say something"
                        value={currentMessage}
                        fullWidth
                        onChange={handleMessageUpdate}
                        onKeyPress={handleKeyPress}
                    />
                </Grid>
                <Grid item xs={3} align="right">
                    <Fab color="primary" aria-label="send" size="medium" onClick={handleSendMessage}>
                        <SendIcon className={classes.send} />
                    </Fab>
                </Grid>
            </Grid>
        </Grid>
    )

    return render()
}


function mapStateToProps(state) {
    return {
        user: state.auth.user.email,
    }
}

export default connect(mapStateToProps)(Chat)
