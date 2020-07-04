import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { ProtectedRoute, Home, Login, Project } from './components'
import history from './history'
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    '@global': {
        body: {
            backgroundColor: '#e9e9e9',
        },
    },
}));

function App(props) {
    const { isAuthenticated, isVerifying } = props
    const classes = useStyles()
    return (
        <Router history={history}>
            <Switch>
                <ProtectedRoute
                    exact
                    path="/"
                    component={Home}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <Route path="/login" component={Login} />
                <ProtectedRoute
                    path="/project/:projectId"
                    component={Project}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
            </Switch>
        </Router>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
    }
}
export default connect(mapStateToProps)(App)
