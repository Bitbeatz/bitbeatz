import React from 'react'
import { connect } from 'react-redux'

import {withStyles} from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import history from '../history'

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

const Share = (props) => {
    const { classes, projectName, projectId } = props;

    const render = () => {
        return (
            <Container maxWidth="xs">
                <Paper className={classes.paper}>
                    <Typography variant="h5">
                        Share { projectName }
                    </Typography>
                    <Typography variant="body2" className={classes.left}>
                        Share the following code with anyone you want to join your project
                    </Typography>
                    <Typography>
                        { projectId }
                    </Typography>
                    <Button
                        variant="contained"
                        color='secondary'
                        className={classes.createButton}
                        onClick={() => history.push(`/project/${projectId}`)}
                    >
                        Continue to Project
                    </Button>
                </Paper>
            </Container>
        )
    };

    return render()
};

function mapStateToProps(state) {
    return {
        user: state.auth.user.email,
    }
}
export default withStyles(styles)(connect(mapStateToProps)(Share))
