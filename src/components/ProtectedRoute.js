import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import ProjectSetup from "./ProjectSetup";

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
                <ProjectSetup {...props} />
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
);export default ProtectedRoute
