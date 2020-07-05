import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import {db} from '../firebase/firebase';
import {connect} from 'react-redux';
import Share from './Share';

import {DEFAULT_CONTROLS, DEFAULT_GRIDS, DEFAULT_LOCATIONS} from './constants'
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
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
    },
    createButton: {
        alignSelf: 'flex-end',
        marginTop: '20px'
    }
});

const ProjectSetup = (props) => {
    const [genre, setGenre] = useState('');
    const [projectName, setProjectName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [projectId, setProjectId] = useState('');
    const tooltipInfo = 'Selecting a genre will give you a template to start your project';

    const handleNameChange = ({target}) => {
        setProjectName(target.value);
    };

    const createProject = async () => {
        if (!genre && !projectName) {
            setErrorMsg('Please fill out the project name and select a genre')
        }
        else if (!projectName) {
            setErrorMsg('Please fill out the project name');
        }
        else if (!genre) {
            setErrorMsg('Please select a genre');
        }
        else {
            // TODO change from .jazz to genre after making more consts
            await db.collection('projects').add({
                name: projectName,
                genre: genre,
                users: [props.user],
                grid: DEFAULT_GRIDS.jazz,
                controls: DEFAULT_CONTROLS,
                locations: {[props.user]: ''}
            }).then((docRef) => {
                setProjectId(docRef.id);
            }).catch((e) => {
                console.log('add failed', e);
                setErrorMsg('Database Error');
            });
        }
    };

    const render = () => {
        const { classes } = props;
        if (projectId) {
            return (
                <Share projectName={projectName} projectId={projectId} />
            );
        } else {
            return (
                <Container maxWidth="xs">
                    <Paper className={classes.paper}>
                        <Typography variant="h5">
                            Create New Project
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="projectName"
                            label="Project Name"
                            name="projectName"
                            onChange={handleNameChange}
                        />
                        <Typography variant="subtitle1" className={classes.left}>
                            Select a Genre Template
                        </Typography>
                        <Tooltip title={tooltipInfo}>
                            <Fab color={'primary'}>
                                More Info
                            </Fab>
                        </Tooltip>
                        <ButtonGroup>
                            <Button variant="contained" color={genre === 'jazz' ? 'primary' : ''}
                                onClick={() => setGenre('jazz')}>
                                Jazz
                            </Button>
                            <Button variant="contained" color={genre === 'rock' ? 'primary' : ''}
                                onClick={() => setGenre('rock')}>
                                Rock
                            </Button>
                            <Button variant="contained" color={genre === 'clas' ? 'primary' : ''}
                                onClick={() => setGenre('clas')}>
                                Classical
                            </Button>
                            <Button variant="contained" color={genre === 'edm' ? 'primary' : ''}
                                onClick={() => setGenre('edm')}>
                                EDM
                            </Button>
                        </ButtonGroup>
                        <Typography variant="body2">
                            or
                        </Typography>
                        <Button variant="contained" color={genre === 'blank' ? 'primary' : ''}
                            onClick={() => setGenre('blank')}>
                            Start From Scratch
                        </Button>
                        <Button variant="contained" color='primary' className={classes.createButton}
                            onClick={createProject}>
                            Create Project
                        </Button>
                        <Typography variant="body2" color={'error'}>
                            { errorMsg }
                        </Typography>
                    </Paper>
                </Container>
            )
        }
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


export default withStyles(styles)(connect(mapStateToProps)(ProjectSetup))
