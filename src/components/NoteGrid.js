import React, { Component } from 'react'
import get from 'lodash/get'
import { withStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {Avatar, Grid} from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';

import {db} from '../firebase/firebase';
import {DEFAULT_GRIDS, DEFAULT_LOCKS} from './constants'
import {Lock, LockOpen} from "@material-ui/icons";
import Radio from "@material-ui/core/Radio";
import {connect} from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";

const styles = () => ({
    '@global': {
        body: {
            backgroundColor: '#fff',
        },
    },
    buttonGroup: {
        margin: 0,
        padding: 0,
        height: "80%"
    },
    button: {
        border: "1px solid",
        borderRadius: 0,
        margin: 0,
        padding: 0,
        height: "auto"
    },
    avatar: {
        // add size here
    }
})


class NoteGrid extends Component {

    constructor(props) {
        super(props);

        console.log(props)
        this.state = {
            grid: props.grid || DEFAULT_GRIDS.jazz,
            loopLength: get(props, 'controls.loopLength', 2),
            drums: {
                0: "Ride", // Ride Cymbal
                1: "Bass", // Bass Drum
                2: "Hi-Hat", // Hi-Hat
                3: "Snare", // Snare Drum
                4: "Low Tom", // Low Tom
            },
            locations: {[props.username]: ''},
            locked: DEFAULT_LOCKS.grid
        }

        this.handleGridClick = this.handleGridClick.bind(this)
        this.handleLabelClick = this.handleLabelClick.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.grid && this.props.grid !== prevProps.grid) {
            this.setState({ grid: this.props.grid })
        }
        if (this.props.locations && this.props.locations !== prevProps.locations) {
            this.setState({ locations: this.props.locations });
            const lockObj = {};
            for (const user in this.props.locations) {
                if(user !== this.props.username) {
                    lockObj[this.props.locations[user]] = user;
                }
            }
            this.setState({
                locked: {
                    0: lockObj[0] ? lockObj[0].toUpperCase()[0] : '',
                    1: lockObj[1] ? lockObj[1].toUpperCase()[0] : '',
                    2: lockObj[2] ? lockObj[2].toUpperCase()[0] : '',
                    3: lockObj[3] ? lockObj[3].toUpperCase()[0] : '',
                    4: lockObj[4] ? lockObj[4].toUpperCase()[0] : ''
                }
            })
        }
        const newLoopLength = get(this.props, 'controls.loopLength')
        if (newLoopLength && newLoopLength !== prevState.loopLength) {
            this.setState({ loopLength: newLoopLength });
        }
    }

    handleLabelClick = (event) => {
        // Do whatever needs to be done when label is clicked
        // Play the sound?
    }

    handleGridClick = (event) => {
        // Handle update to grid square
        // Update grid locally (change grid colour and state)
        var id = event.target.id
        var row = Math.floor(id / 24)
        var col = id % 24
        var val = this.state.grid[row][col]
        var newGrid = this.state.grid
        console.log(row, col, id)

        if(val === 1) {
            newGrid[row][col] = 0
            event.target.style.color = "black"
            event.target.style.backgroundColor = "white"
            event.target.variant = 'contained'

        } else {
            newGrid[row][col] = 1
            event.target.style.color = "black"
            event.target.style.backgroundColor = "red"
            event.target.variant = 'outlined'
        }

        this.updateFireStore(newGrid)
    }

    updateFireStore = (newGrid) => {
        db.collection('projects').doc(this.props.projectId).update({
            grid: newGrid,
        })
            .then(() => {
                console.log('updated grid successfully')
            })
            .catch(e => console.error(e))
    }

    handleLocationsChange = (loc) => {
        if (this.state.locations[this.props.username] === loc) {
            this.setState({locations: {[this.props.username]: ''}});
            this.updateFireStoreLocations('');
        } else {
            this.setState({locations: {[this.props.username]: loc}});
            this.updateFireStoreLocations(loc);
        }
    };

    updateFireStoreLocations = (loc) => {
        const updateData = {[`locations.${this.props.username}`]: loc};

        db.collection('projects').doc(this.props.projectId).update(updateData)
            .then(() => {
                console.log('updated locations successfully')
            })
            .catch(e => console.error(e))
    };

    render = () => {
        const { classes } = this.props
        return (
            <Box display="flex" flexDirection="row" >
                <Grid container spacing={0} direction="column" xs={2}>
                    { Object.keys(this.state.drums).map((drum_sound, i) => (
                        <Grid container>
                            <Grid item>
                                { !this.state.locked[i] ?
                                    <Tooltip title={this.state.locations[this.props.username] === i ? 'Stop modifying control' : 'Modify control'}>
                                        <Radio
                                            icon={<Lock/>}
                                            checkedIcon={<LockOpen/>}
                                            value={i}
                                            onClick={() => this.handleLocationsChange(i)}
                                            checked={this.state.locations[this.props.username] === i}
                                        />
                                    </Tooltip>
                                    :
                                    <Tooltip title={'Another user is currently modifying this control'}>
                                        <Avatar className={classes.avatar}>{ this.state.locked[i] }</Avatar>
                                    </Tooltip>
                                }
                            </Grid>
                            <Grid item key={i} spacing={0}>
                                <Tooltip title={"Play sound"}>
                                    <Button id={this.state.drums[i]} fullWidth variant="text" size="small" onClick={this.handleLabelClick}>
                                        {this.state.drums[i]}
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={0}>
                    { Object.keys(this.state.grid).map((row, i) => (
                        <Grid container key={i} spacing={0}>
                            { this.state.locations[this.props.username] !== i ?
                                <Tooltip
                                    title={this.state.drums[i] + ' is Locked'}
                                    arrow
                                    placement={'left-start'}>
                                    <div>
                                        <ButtonGroup disabled={true} className={classes.buttonGroup} size="medium">
                                            {this.state.grid[row].map((active, j) => (
                                                j < this.state.loopLength * 3 && <Button
                                                    id={(i * 24) + j}
                                                    key={(i * 24) + j}
                                                    className={classes.button}
                                                    style={{backgroundColor: active ? '#BDBDBD' : 'white'}}
                                                    onClick={this.handleGridClick}>
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </div>
                                </Tooltip> :
                                <div>
                                    <ButtonGroup className={classes.buttonGroup} size="medium">
                                        {this.state.grid[row].map((active, j) => (
                                            j < this.state.loopLength * 3 && <Button
                                                id={(i * 24) + j}
                                                key={(i * 24) + j}
                                                className={classes.button}
                                                style={{backgroundColor: active ? '#f50057' : 'white'}}
                                                onClick={this.handleGridClick}>
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </div>
                            }
                        </Grid>
                    ))}
                </Grid>
            </Box>
            )
    }

}

function mapStateToProps(state) {
    const user = state.auth.user.email;
    let username = '';
    if (user.includes('.')) {
        const splitName = state.auth.user.email.split('.');
        for (let i = 0; i < splitName.length - 1; i++) {
            username = username + splitName[i];
        }
    }
    return {
        user: user,
        username: username
    }
}

export default withStyles(styles)(connect(mapStateToProps)(NoteGrid))
