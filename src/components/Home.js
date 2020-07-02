import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions'
import { getMyProjects } from '../helpers/queryProjects'
import ProjectSetup from "./ProjectSetup";

const Home = (props) => {
    const handleLogout = () => {
        const { dispatch } = props
        dispatch(logoutUser())
    }

    const [projects, setProjects] = useState([])
    const [isNewProj, setIsNewProj] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const res = await getMyProjects(props.user)
            setProjects(res)
        }
        fetchData()
    }, [])

    getMyProjects(props.user)

    const render = () => {
        const { isLoggingOut, logoutError } = props
        if (isNewProj) {
            return <ProjectSetup />;
        }
        else {
            return (
                <div>
                    <h1>This is your app&apos;s protected area.</h1>
                    <p>Any routes here will also be protected</p>
                    <button onClick={handleLogout}>Logout</button>
                    {isLoggingOut && <p>Logging Out....</p>}
                    {logoutError && <p>Error logging out</p>}
                    <button onClick={() => setIsNewProj(true)}>Create New Project</button>
                    <p>My projects: </p>
                    <ul>
                        {projects.map(project => (
                            <li key={project.name}>{project.name}</li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    return render()
}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user.email
    }
}
export default connect(mapStateToProps)(Home)
