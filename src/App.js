import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { ProtectedRoute, Home, Login, Project, Share } from './components'
import history from './history'

function App(props) {
    const { isAuthenticated, isVerifying } = props
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
