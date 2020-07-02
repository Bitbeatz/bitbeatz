import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createUser, loginUser } from '../actions'
import { withStyles } from '@material-ui/styles'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

const styles = () => ({
    '@global': {
        body: {
            backgroundColor: '#e9e9e9',
        },
    },
    paper: {
        marginTop: 100,
        display: 'flex',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        marginTop: 1,
    },
    left: {
        alignSelf: 'flex-start'
    }
});

const ProjectSetup = (props) => {
    const [genre, setGenre] = useState(0);
    const render = () => {
        const { classes } = props;
        return (
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Create New Project
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="projectName"
                        label="Project Name"
                        name="projectName"
                    />
                    <Typography component="genre" variant="subtitle1" className={classes.left}>
                        Select a Genre Template
                    </Typography>
                    <ButtonGroup>
                        <Button variant="contained" color={genre === 1 ? 'primary' : ''} onClick={() => setGenre(1)}>Jazz</Button>
                        <Button variant="contained" onClick={() => setGenre(2)}>Rock</Button>
                        <Button variant="contained" onClick={() => setGenre(3)}>Classical</Button>
                        <Button variant="contained" onClick={() => setGenre(4)}>EDM</Button>
                    </ButtonGroup>
                    <Typography component="or" variant="body2">
                        or
                    </Typography>
                    <ButtonGroup>
                        <Button onClick={() => setGenre(5)}>
                            Start From Scratch
                        </Button>
                    </ButtonGroup>
                    <Typography component="descr" variant="body2">
                        The genre you select will define the key of your song. Don't worry if you are unsure what that means.
                        Just choose the genre of music you want to make a song in and we'll set everything up for you!
                    </Typography>
                </Paper>
            </Container>
        )
    };

    return render()
};


export default withStyles(styles)(ProjectSetup)
