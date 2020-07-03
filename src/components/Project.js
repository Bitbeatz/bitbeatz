import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {connect} from 'react-redux'
import get from 'lodash/get'
import { ProjectSetup } from './index'
import Controls from "./Controls";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
    paper: {
        padding: 50,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const Project = (props) => {
    const classes = useStyles()
    const { match: { params }} = props
    const projectId = get(params, 'projectId')
    const isNewProject = projectId === 'new'

    const render = () => {
        return (
            <Container className={classes.root}>
                { isNewProject
                    ? <ProjectSetup />
                    : <div>
                        <Grid container spacing={3}>
                            <Grid item xs={9}>
                                <Paper className={classes.paper}>Matrix</Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className={classes.paper}>Chat</Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Controls />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                }
            </Container>
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
