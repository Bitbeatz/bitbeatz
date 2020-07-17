import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import clsx from 'clsx'
import get from 'lodash/get'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Container, Grid, Paper, Switch, Toolbar, IconButton, AppBar, Typography, Box } from '@material-ui/core'
import {Face, PauseCircleFilled, PlayCircleFilled, VideocamOff} from '@material-ui/icons'

import { ProjectSetup } from './index'
import Controls from './Controls'
import ControlsNoLocks from './ControlsNoLocks'
import {db} from '../firebase/firebase'
import NoteGrid from './NoteGrid'
import Chat from './Chat'
import {DEFAULT_CONTROLS, DEFAULT_GRIDS } from './constants'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
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
    },
    containerPaper: {
        color: theme.palette.text.secondary,
        backgroundColor: '#182f50'
    },
    overflow: {
        overflow: 'hidden'
    },
    section: {
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden'
    },
    cam: {
        backgroundColor: '#000000'
    }
}))

const Project = (props) => {
    const classes = useStyles()
    const { match: { params }} = props
    const projectId = get(params, 'projectId')
    const isNewProject = projectId === 'new'
    const [playing, setPlaying] = useState(false)
    const [project, setProject] = useState({
        controls: DEFAULT_CONTROLS,
        genre: 'jazz',
        grid: DEFAULT_GRIDS.jazz,
        ideal: DEFAULT_GRIDS.jazz,
        locations: {[props.user]: ''},
        name: '',
        users: [props.user],
    })

    useEffect(() => {
        const unsubscribe = db.collection('projects').doc(projectId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    setProject(doc.data())
                }
            })
        return unsubscribe
    }, [projectId])

    const render = () => {
        return (
            <div>
                { isNewProject
                    ? <ProjectSetup />
                    : <div>
                        <AppBar position="static">
                            <Toolbar>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Typography variant="h4">
                                            { project.name }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body2">
                                        Share Code: { projectId }
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                        <Container maxWidth="xl" className={classes.root}>
                            <Grid>
                                <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
                                    <Grid item xs={12}>
                                        <Paper className={classes.gridPaper}>
                                            <Box display="flex" justifyContent="center" alignItems="center" className={classes.overflow}>
                                                <IconButton color="primary" aria-label="menu" onClick={() => setPlaying(!playing)}>
                                                    { !playing ? <PlayCircleFilled /> : <PauseCircleFilled /> }
                                                </IconButton>
                                                <NoteGrid projectId={projectId} grid={project.grid} controls={project.controls}/>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={9}>
                                        <Paper className={classes.paper}>
                                            <Controls projectId={projectId} locations={project.locations} controls={project.controls} />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Paper className={classes.section}>
                                                    <Chat projectId={projectId} messages={project.chatMessages}/>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={clsx(classes.paper, classes.cam)}>
                                                    <Face color={'primary'} />
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={clsx(classes.paper, classes.cam)}>
                                                    <Face color={'primary'} />
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={clsx(classes.paper, classes.cam)}>
                                                    <Face color={'primary'} />
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={clsx(classes.paper, classes.cam)}>
                                                    <VideocamOff color={'secondary'} />
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
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
