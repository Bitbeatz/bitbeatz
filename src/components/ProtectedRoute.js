import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import NavBar from './NavBar'

const ProtectedRoute = ({
    component: Component,
    isAuthenticated,
    isVerifying,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            isVerifying ? (
                <div />
            ) : isAuthenticated ? (
                <NavBar>
                    <Component {...props} />
                </NavBar>
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
)
export default ProtectedRoute
