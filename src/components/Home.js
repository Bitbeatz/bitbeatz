import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions'
const Home = (props) => {
    const handleLogout = () => {
        const { dispatch } = props
        dispatch(logoutUser())
    }
    const render = () => {
        const { isLoggingOut, logoutError } = props
        return (
            <div>
                <h1>This is your app&apos;s protected area.</h1>
                <p>Any routes here will also be protected</p>
                <button onClick={handleLogout}>Logout</button>
                { isLoggingOut && <p>Logging Out....</p> }
                { logoutError && <p>Error logging out</p> }
            </div>
        )
    }

    return render()
}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
    }
}export default connect(mapStateToProps)(Home)