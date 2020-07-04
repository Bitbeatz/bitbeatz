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
        
        this.state = {
            grid: {
                0: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            },
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
        this.subscribeToFirestore = this.subscribeToFirestore.bind(this)
        this.getInitialGridState = this.getInitialGridState.bind(this)
        this.createGridInDB = this.createGridInDB.bind(this)
        
    }
    
    componentDidMount() {
        // If new project create grid for project in DB
        // Do the database stuff
        /*
        if(this.props.isNewProject) {
             this.createGridInDB()
        } else {
            // Get initial grid state from db
            this.getInitialGridState()
            
            if(this.state.grid) {
                this.createGridInDB()
            }
        }
        
        // Subscribe to firestore
        this.subscribeToFirestore()
        */
    }
    
    
    componentDidUpdate(prevProps, prevState) {
        // When component is updated send grid state to DB
        if(this.state.grid !== prevState.grid) {
            // Update grid in database
            
        }
    }
    
    // Create Grid for new project
    createGridInDB = async () => {
        await db.collection('projects').doc(this.props.projectId).update({
                grid: this.state.grid
            }).catch((e) => {
                console.log('Create grid failed', e)
            })
    }
    
    // Subscribe to realtime updates
    subscribeToFirestore = async () => {
        var grid = {}
       await db.collection('projects').doc(this.props.projectId)
            .onSnapshot(function(doc) {
                grid = doc.grid
            })
            
        this.setState({
                    grid: grid
                })
    }
    
    // Pull grid state from DB on page load
    getInitialGridState = async () => {
        await db.collection('projects').doc(this.props.projectId)
                    .get()
                    .then(function(snapshot) {
                        this.setState({
                            grid: snapshot.grid
                        })
                    }).catch((e) => {
                        console.log('Get grid data failed', e)
                        this.createGridInDB()
                    })
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
        
        this.setState({
            grid: newGrid
        })
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
                                { this.state.grid[row].map((j) =>
                                    <Button id={(i*24)+j} className={classes.button} onClick={this.handleGridClick}></Button>
                                )}
                            </ButtonGroup>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            )
    }
    
}

export default withStyles(styles)(NoteGrid)
