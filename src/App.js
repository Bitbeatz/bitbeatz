import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import Share from "./components/Share";
import ProjectSetup from "./components/ProjectSetup";

function App(props) {
    const { isAuthenticated, isVerifying } = props
    return (
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
                exact
                path="/share"
                component={Share}
            />
            <ProtectedRoute
                exact
                path="/setup"
                component={ProjectSetup}
            />
        </Switch>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying,
    }
}
export default connect(mapStateToProps)(App)
