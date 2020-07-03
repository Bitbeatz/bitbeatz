import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions'
import { getMyProjects } from '../helpers/queryProjects'
import ProjectSetup from "./ProjectSetup";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {withStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {db} from "../firebase/firebase";
import * as firebase from "firebase";
import Project from "./Project";

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
        alignSelf: 'flex-start'
    },
    right: {
        alignSelf: 'flex-end'
    },
    center: {
        alignSelf: 'center'
    }
});

const Home = (props) => {
    const handleLogout = () => {
        const { dispatch } = props
        dispatch(logoutUser())
    }

    const [projects, setProjects] = useState([]);
    const [isNewProj, setIsNewProj] = useState(false);
    const [isProj, setIsProj] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    useEffect(() => {
        async function fetchData() {
            const res = await getMyProjects(props.user)
            setProjects(res)
        }
        fetchData()
    }, [])

    getMyProjects(props.user)

    const joinProject = () => {

    };

    const handleJoinCodeChange = ({target}) => {
        setJoinCode(target.value);
    };

    const render = () => {
        const { classes } = props;
        const { isLoggingOut, logoutError } = props;
        if (isNewProj) {
            return <ProjectSetup />;
        }
        if (isProj) {
            return <Project />;
        }
        else {
            return (
                <div>
                    <Paper className={classes.paper}>
                        <Button variant="contained" color={"secondary"} className={classes.right} onClick={handleLogout}>Logout</Button>
                        {isLoggingOut && <p>Logging Out....</p>}
                        {logoutError && <p>Error logging out</p>}
                        <Typography variant="h2" className={classes.center}>
                            BitBeatz
                        </Typography>


                        <Typography variant="h4">
                            Projects
                        </Typography>
                        <Button variant="contained" color={"primary"} onClick={() => setIsNewProj(true)}>Create New Project</Button>
                        <row>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="join"
                                    label="Join Project With Invite Code"
                                    name="join"
                                    onChange={handleJoinCodeChange}
                                />
                                <Button variant="contained" color={"primary"} onClick={joinProject}>
                                    Join
                                </Button>
                        </row>
                        <List>
                            {projects.map(project => (
                                <ListItem key={project.name} onClick={() => setIsProj(true)}>{project.name}</ListItem>
                            ))}
                        </List>
                    </Paper>
                </div>
            )
        }
    };

    return render()
};

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user.email
    }
}
export default withStyles(styles)(connect(mapStateToProps)(Home))
