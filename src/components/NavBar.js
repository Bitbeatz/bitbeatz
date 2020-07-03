import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { logoutUser } from '../actions'
import history from '../history'
import { getMyProjects } from '../helpers/queryProjects'

const drawerWidthOpen = 240
const drawerWidthClosed = 60

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    bottom: {
        position: 'absolute',
        bottom: '10px',
        display: 'grid',
        width: 'inherit',
    },
    centered: {
        margin: '0 auto',
        width: '50%',
    },
    drawerClosed: {
        width: drawerWidthClosed,
        flexShrink: 0,
    },
    drawerOpen: {
        width: drawerWidthOpen,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidthOpen,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShiftClosed: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    contentShiftOpen: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}))

function NavBar(props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await getMyProjects(props.user)
            setProjects(res)
        }
        fetchData()
    }, [props.user])

    const handleLogout = () => {
        const { dispatch } = props
        dispatch(logoutUser())
    }

    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={open ? classes.drawerOpen : classes.drawerClosed}
                variant="persistent"
                anchor="left"
                open={true}
                classes={{
                    paper: open ? classes.drawerPaper : classes.closedDrawer,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={toggleDrawer}>
                        { open ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
                    </IconButton>
                </div>
                <Divider />
                { open &&
                    <React.Fragment>
                        <List>
                            { projects.map(project => (
                                <ListItem button key={project.name} onClick={() => history.push(`/project/${project.name}`)}>
                                    <ListItemText primary={project.name} />
                                </ListItem>
                            )) }
                        </List>
                        <ListItem button onClick={() => history.push('/project/new')}>
                            <ListItemText primary="Create a new project" />
                        </ListItem>
                    </React.Fragment>
                }
                <div className={classes.bottom}>
                    <Button variant="contained" color={'secondary'} className={classes.centered} onClick={handleLogout}>Logout</Button>
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, open ? classes.contentShiftOpen : classes.contentShiftClosed)}
            >
                { props.children }
            </main>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        user: state.auth.user.email,
    }
}
export default connect(mapStateToProps)(NavBar)