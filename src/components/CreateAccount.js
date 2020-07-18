import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { createUser } from '../actions'
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
    errorText: {
        color: '#f50057',
        marginBottom: 5,
        textAlign: 'center',
    },
    submit: {
        margin: '10px 0 10px 0',
    }
})

const CreateAccount = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const handleEmailChange = ({ target }) => {
        setEmail(target.value)
    }

    const handleConfirmPasswordChange = ({ target }) => {
        setConfirmPassword(target.value)
        setPasswordError('')
    }
    const handlePasswordChange = ({ target }) => {
        setPassword(target.value)
        setPasswordError('')
    }

    const handleCreateUser = () => {
        const { dispatch } = props
        if (password !== confirmPassword) {
            setPasswordError('Passwords must match')
            return
        }

        dispatch(createUser(email, password))
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
                            Create Account
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={handleEmailChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="none"
                            fullWidth
                            name="confirm password"
                            label="Confirm Password"
                            type="password"
                            id="confirmpassword"
                            onChange={handleConfirmPasswordChange}
                        />
                        { passwordError && (
                            <Typography component="p" className={classes.errorText}>
                                { passwordError }
                            </Typography>
                        ) }
                        { loginError && (
                            <Typography component="p" className={classes.errorText}>
                                { loginError }
                            </Typography>
                        ) }
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleCreateUser}
                        >
                            Create Account
                        </Button>
                        <Typography variant="body2">Already have an account? <Link to='/login'>Login</Link></Typography>
                    </Paper>
                </Container>
            )
        }
    }

    return render()
}

function mapStateToProps(state) {
    return {
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
    }
}
export default withStyles(styles)(connect(mapStateToProps)(CreateAccount))
