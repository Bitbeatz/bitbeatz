import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../actions'
import { withStyles } from '@material-ui/styles'

import { Avatar, Button, Container, Paper, TextField, Typography} from '@material-ui/core'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

const styles = () => ({
    '@global': {
        body: {
            backgroundColor: '#fff',
        },
    },
    paper: {
        marginTop: 100,
        display: 'flex',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#f50057',
    },
    form: {
        marginTop: 1,
    },
    errorText: {
        color: '#f50057',
        marginBottom: 5,
        textAlign: 'center',
    },
    submit: {
        margin: '10px 0 10px 0'
    }
})

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = ({ target }) => {
        setEmail(target.value)
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value)
    }

    const handleSubmit = () => {
        const { dispatch } = props

        dispatch(loginUser(email, password))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    const render = () => {
        const { classes, loginError, isAuthenticated } = props
        if (isAuthenticated) {
            return <Redirect to="/" />
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={handleEmailChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            variant="outlined"
                            margin="none"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                        />
                        { loginError && (
                            <Typography component="p" className={classes.errorText}>
                                Incorrect email or password.
                            </Typography>
                        ) }
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Typography variant="body2">Need an account? <Link to='/createAccount'>Create Account</Link></Typography>
                    </Paper>
                </Container>
            )
        }
    }

    return render()
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
    }
}
export default withStyles(styles)(connect(mapStateToProps)(Login))
