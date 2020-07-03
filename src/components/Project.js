import React, { useState } from 'react'
import {ThemeProvider, withStyles} from '@material-ui/styles'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { createMuiTheme } from '@material-ui/core/styles'
import {db} from "../firebase/firebase";
import {connect} from "react-redux";
import Share from "./Share";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '50%',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const Project = (props) => {
    const render = () => {
        const classes = useStyles;
        return (
            <container className={classes.root}>
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
                        <Paper className={classes.paper}>Bottom Bar</Paper>
                    </Grid>
                </Grid>
            </container>
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


export default connect(mapStateToProps)(Project)
