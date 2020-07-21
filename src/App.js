import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { ProtectedRoute, Home, IntroPage, Login, Project, CreateAccount } from './components'
import history from './history'

function App(props) {
    const { isAuthenticated, isVerifying } = props
    return (
        <Router history={history}>
            <Switch>
                { isAuthenticated
                    ? <ProtectedRoute
                        exact
                        path="/"
                        component={Home}
                        isAuthenticated={isAuthenticated}
                        isVerifying={isVerifying}
                    />
                    : <Route exact path="/" component={IntroPage} />
                }
                <Route path="/login" component={Login} />
                <Route path="/createAccount" component={CreateAccount} />
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
