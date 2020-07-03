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
    },
    createButton: {
        alignSelf: 'flex-end',
        marginTop: '20px'
    }
});

const Project = (props) => {


    const theme = createMuiTheme({
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: '#4791db',
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#81c784',
            },
        },
    });

    const render = () => {
        const { classes } = props;
        return (
            <Container maxWidth="xs">

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


export default withStyles(styles)(connect(mapStateToProps)(Project))
