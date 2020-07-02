import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions'
import { getMyProjects } from '../helpers/queryProjects'

const Share = (props) => {
    const render = () => {
        return (
            <div>
                test
            </div>
        )
    };

    return render()
};

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user.email,
    }
}
export default connect(mapStateToProps)(Share)
