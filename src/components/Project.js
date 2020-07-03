import React from 'react'
import {withStyles} from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import {connect} from 'react-redux'
import get from 'lodash/get'
import { ProjectSetup } from './index'

const styles = () => ({
})

const Project = (props) => {
    const { match: { params }} = props
    const projectId = get(params, 'projectId')
    const isNewProject = projectId === 'new'

    const render = () => {
        return (
            <Container maxWidth="xs">
                { isNewProject
                    ? <ProjectSetup />
                    : <div>not new project</div>
                }
            </Container>
        )
    }

    return render()
}

function mapStateToProps(state) {
    return {
        user: state.auth.user.email,
    }
}


export default withStyles(styles)(connect(mapStateToProps)(Project))
