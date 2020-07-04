import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import get from 'lodash/get'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Container, Grid, Paper, Toolbar, IconButton, AppBar, Typography, Box } from '@material-ui/core'
import {PauseCircleFilled, PlayCircleFilled} from '@material-ui/icons'

import { ProjectSetup } from './index'
import Controls from './Controls'
import {db} from '../firebase/firebase'
import NoteGrid from './NoteGrid'
import Chat from './Chat'

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
    },
    containerPaper: {
        color: theme.palette.text.secondary,
    }
}))

const Project = (props) => {
    const classes = useStyles()
    const { match: { params }} = props
    const projectId = get(params, 'projectId')
    const isNewProject = projectId === 'new'
    const [playing, setPlaying] = useState(false)
    const [project, setProject] = useState({})

    useEffect(() => {
        db.collection('projects').doc(projectId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    setProject(doc.data())
                }
            })
    }, [projectId])

    const render = () => {
        return (
            <div>
                { isNewProject
                    ? <ProjectSetup />
                    : <div>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setPlaying(!playing)}>
                                    { !playing ? <PlayCircleFilled /> : <PauseCircleFilled /> }
                                </IconButton>
                                <Typography variant="h6">
                                    { project.name }
                                </Typography>
                                <Typography variant="body1">
                                Share Code:
                                </Typography>
                                <Typography variant="body2">
                                    { projectId }
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Paper className={classes.containerPaper}>
                            <Container maxWidth="xl" className={classes.root}>
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
                                            <Paper>
                                                <Chat projectId={projectId} messages={project.chatMessages}/>
                                            </Paper>
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
                        </Paper>
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
