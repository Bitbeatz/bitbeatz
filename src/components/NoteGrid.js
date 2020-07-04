import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateGrid } from '../actions/notegrid'
import { withStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { sizing } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import { positions } from '@material-ui/system';
import { Grid } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import get from 'lodash/get'

import {db} from '../firebase/firebase';
import { DEFAULT_GRID } from './constants'

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
    }
    
})


class NoteGrid extends Component {
    
    constructor(props) {
        super(props);
        
        console.log(props)
        this.state = {
            grid: props.grid || DEFAULT_GRID,
            drums: {
                0: "Ride", // Ride Cymbal
                1: "Bass", // Bass Drum
                2: "Hi-Hat", // Hi-Hat
                3: "Snare", // Snare Drum
                4: "Low Tom", // Low Tom
            }
        }
        
        this.handleGridClick = this.handleGridClick.bind(this)
        this.handleLabelClick = this.handleLabelClick.bind(this)        
    }

    componentDidUpdate(prevProps) {
        if (this.props.grid !== prevProps.grid) {
            this.setState({ grid: this.props.grid })
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
    
    render = () => {
        const { classes } = this.props
        return (
            <Box display="flex" flexDirection="row" >
                <Grid container spacing={0} direction="column">
                    { Object.keys(this.state.drums).map((drum_sound, i) => (
                        <Grid item key={i} spacing={0}>
                            <Button id={this.state.drums[i]} fullWidth="true" variant="text" size="small" onClick={this.handleLabelClick}>{this.state.drums[i]}</Button>
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={0}>
                    { Object.keys(this.state.grid).map((row, i) => (
                        <Grid item key={i} spacing={0}>
                            <ButtonGroup className={classes.buttonGroup} size="medium">
                                { this.state.grid[row].map((active, j) => (
                                <Button
                                    id={(i*24)+j}
                                    className={classes.button}
                                    style={{ backgroundColor: active ? 'red' : 'white' }}
                                    onClick={this.handleGridClick}>
                                </Button>
                            ))}
                            </ButtonGroup>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            )
    }
    
}

export default withStyles(styles)(NoteGrid)