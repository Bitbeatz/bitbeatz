import React, {useState} from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {connect} from 'react-redux'
import get from 'lodash/get'
import { ProjectSetup } from './index'
import Controls from "./Controls";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {PauseCircleFilled, PlayCircleFilled} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {db} from "../firebase/firebase";
import NoteGrid from '../components/NoteGrid';
import { flexbox } from '@material-ui/system';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 50,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    gridPaper: {
        padding: 20,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const Project = (props) => {
    const classes = useStyles()
    const { match: { params }} = props
    const projectId = get(params, 'projectId')
    const isNewProject = projectId === 'new'
    const [playing, setPlaying] = useState(false);
    const [projName, setProjName] = useState('');

    db.collection('projects').doc(projectId).get()
        .then((doc) => {
            if (doc.exists) {
                setProjName(doc.data().name);
            }
        });

    const render = () => {
        return (
            <div>
                { isNewProject
                ? <ProjectSetup />
                : <div>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setPlaying(!playing)}>
                                {!playing ? <PlayCircleFilled /> : <PauseCircleFilled /> }
                            </IconButton>
                            <Typography variant="h6">
                                {projName}
                            </Typography>
                            <Typography variant="body1">
                                Share Code:
                            </Typography>
                            <Typography variant="body2">
                                {projectId}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Container className={classes.root}>
                        <div>
                            <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
                                <Grid item xs={9}>
                                    <Paper className={classes.gridPaper}>
                                    <Box justifyContent="flex-start" alignItems="flex-start">
                                        <NoteGrid projectId={projectId} isNewProject={isNewProject}/>
                                    </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper className={classes.paper}>Chat</Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} >
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Controls />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                }
            </div>
        )
    }

    return render()
}

function mapStateToProps(state) {
    return {
        user: state.auth.user.email,
    }
}


export default connect(mapStateToProps)(Project)
