import React from 'react'
import { Link } from 'react-router-dom'
import {withStyles} from '@material-ui/styles';
import { Container, Typography } from '@material-ui/core';
import { Intro } from './index'

const styles = () => ({
    container: {
        padding: 100,
        height: '100vh'
    },
    spacing: {
        marginTop: 20
    }
});

const IntroPage = (props) => {
    const { classes } = props
    const render = () => (
        <Container disableGutters className={classes.container}>
            <Intro />
            <Typography align="center" className={classes.spacing}>
                <span>Ready to go? </span>
                <Link to='/createAccount'>Create an account</Link>
                <span>, or </span>
                <Link to='/login'>login</Link>
                <span> if you already have one.</span>
            </Typography>
        </Container>
    )
    return render()
}

export default withStyles(styles)(IntroPage)