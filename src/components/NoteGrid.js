import React, { useState } from 'react'
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
    gridLabels: {
        
    },
    grid: {
        
    }
})

const NoteGrid = (props) => {
    
    const handleGridClick = ({ target }) => {
        updateGrid(target.value)
    }
    
    const grid = {
        0: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        3: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        4: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
    
    const drums = {
        0: "drum_sound1",
        1: "drum_sound2",
        2: "drum_sound3",
        3: "drum_sound4",
        4: "drum_sound5",
    }

    
    const render = () => {
        const { classes } = props
        return (
            <Box display="flex" flexDirection="row">
                <Grid container spacing={0} direction="column" className="gridLabels">
                    { Object.keys(drums).map((drum_sound, i) => (
                        <Grid item key={i} spacing={0}>
                            <Button variant="text" size="small">{drums[i]}</Button>
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={0} className="grid">
                    { Object.keys(grid).map((row, i) => (
                        <Grid item key={i} spacing={0}>
                            <ButtonGroup className={classes.buttonGroup} size="medium">
                                { grid[row].map((j) =>
                                    <Button id={(i+1)*(j+1)} className={classes.button}></Button>
                                )}
                            </ButtonGroup>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            )
    }
    
    return render()
}

function mapStateToProps(state) {
    return {
        
    }
}

export default withStyles(styles)(connect(mapStateToProps)(NoteGrid))