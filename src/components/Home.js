import React, { useState } from 'react'
import { connect } from 'react-redux'
import {withStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import history from '../history'
import { joinProject } from '../helpers/joinProject'

const styles = () => ({
    '@global': {
        body: {
            backgroundColor: '#e9e9e9',
        },
    },
    paper: {
        display: 'flex',
        padding: 100,
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
    const { classes, isLoggingOut, logoutError, email } = props;
    const [joinCode, setJoinCode] = useState('');
    const [joinStatus, setJoinStatus] = useState('')

    const handleJoinProject = async () => {
        const success = await joinProject(email, joinCode)
        setJoinStatus(success || 'Failed to join')
        if (success) {
            history.push(`/project/${joinCode}`)
        }
    };

    const handleJoinCodeChange = ({target}) => {
        setJoinCode(target.value);
    };

    const render = () => {
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
                        <Button variant="contained" color={'primary'} onClick={handleJoinProject}>
                            Join
                        </Button>
                        <span>{ joinStatus }</span>
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
        email: state.auth.user.email,
    }
}
export default withStyles(styles)(connect(mapStateToProps)(Home))
