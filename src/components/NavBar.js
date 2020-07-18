import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import { Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemText, Tooltip } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add'
import LogoutIcon from '@material-ui/icons/ExitToApp'

import { logoutUser } from '../actions'
import history from '../history'
import { getMyProjects } from '../helpers/queryProjects'

const drawerWidthOpen = 240
const drawerWidthClosed = 60

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    active: {
        color: '#3f51b5 !important',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: '#3f51b5',
        }
    },
    bottom: {
        position: 'absolute',
        bottom: '10px',
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
    content: {
        flexGrow: 1,
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
    list: {
        height: '100%'
    }
}))

function NavBar(props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        if (!props.user) return
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

    const NavItem = ({to, text}) => {
        return <NavLink exact to={to} activeClassName={classes.active} className={classes.link}>
            <ListItem button>
                <ListItemText primary={text} />
            </ListItem>
        </NavLink>
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
                <List className={classes.list}>
                    { open
                        ? <React.Fragment>
                            <ListItem>
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </ListItem>
                            <NavItem to="/" text="Home" />
                            <NavLink exact to="/project/new" activeClassName={classes.active} className={classes.link}>
                                <ListItem button>
                                    <ListItemText primary="Create New Project" />
                                </ListItem>
                            </NavLink>
                            <Divider />
                            { projects.map(project => (
                                <NavItem key={project.id} to={`/project/${project.id}`} text={project.name}/>
                            )) }
                            <ListItem button onClick={handleLogout} className={classes.bottom}>
                                <ListItemText primary="Logout"/>
                            </ListItem>
                        </React.Fragment>
                        : <React.Fragment>
                            <ListItem>
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronRightIcon />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <Tooltip title="Home" placement="top">
                                    <IconButton onClick={() => history.push('/')}>
                                        <HomeIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip title="Create New Project" placement="top">
                                    <IconButton onClick={() => history.push('/project/new')}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                            <Tooltip title="Logout">
                                <ListItem className={classes.bottom}>
                                    <IconButton onClick={handleLogout}><LogoutIcon /></IconButton>
                                </ListItem>
                            </Tooltip>
                        </React.Fragment>
                    }
                </List>
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
