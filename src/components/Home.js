import React, { useState } from 'react'
import { connect } from 'react-redux'
import {withStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import history from '../history'

const styles = () => ({
    '@global': {
        body: {
            backgroundColor: '#e9e9e9',
        },
    },
    paper: {
        margin: 50,
        display: 'flex',
        padding: 75,
        flexDirection: 'column'
    },
    form: {
        marginTop: 1,
    },
    left: {
        alignSelf: 'flex-start',
    },
    right: {
        alignSelf: 'flex-end',
    },
    center: {
        alignSelf: 'center',
    },
});

const Home = (props) => {
    const [joinCode, setJoinCode] = useState('');

    const joinProject = () => {

    };

    const handleJoinCodeChange = ({target}) => {
        setJoinCode(target.value);
    };

    const render = () => {
        const { classes } = props;
        const { isLoggingOut, logoutError } = props;
        return (
            <Container>
                <Paper className={classes.paper}>
                    { isLoggingOut && <p>Logging Out....</p> }
                    { logoutError && <p>Error logging out</p> }
                    <Typography variant="h2" className={classes.center}>
                            BitBeatz
                    </Typography>


                    <Typography variant="h4">
                            Projects
                    </Typography>
                    <Button variant="contained" color={'primary'} onClick={() => history.push('/project/new')}>Create New Project</Button>
                    <div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="join"
                            label="Join Project With Invite Code"
                            name="join"
                            onChange={handleJoinCodeChange}
                        />
                        <Button variant="contained" color={'primary'} onClick={joinProject}>
                                    Join
                        </Button>
                    </div>
                </Paper>
            </Container>
        )
    };

    return render()
};

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user.email,
    }
}
export default withStyles(styles)(connect(mapStateToProps)(Home))
