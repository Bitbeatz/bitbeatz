import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateGrid } from '../actions/notegrid'
import { withStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { sizing } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import { positions } from '@material-ui/system';

const styles = () => ({
    '@global': {
        body: {
            backgroundColor: '#fff',
        },
    },
    paper: {
        marginTop: 100,
        display: 'flex',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    rows: {
        height: "20px"
    },
    button: {
        margin: 0,
        padding: 0,
        border: "1px solid",
        "border-radius": 0,
        height: "20px"
    },
    gridparent: {
        
    }
})

const NoteGrid = (props) => {
    
    const handleGridClick = ({ target }) => {
        updateGrid(target.value)
    }
    
    const grid = {
        0: [0,0,0,0,0,0],
        1: [0,0,0,0,0,0],
        2: [0,0,0,0,0,0],
        3: [0,0,0,0,0,0],
        4: [0,0,0,0,0,0]
    }

    
    const render = () => {
        const { classes } = props
        return (
            <Container className={classes.gridparent} maxWidth="s" maxHeight="s">
                { Object.keys(grid).map((row, i) => (
                    <Container className={classes.rows} key={i}>
                        { grid[row].map((j) =>
                            <Button id={(i+1)*(j+1)} className={classes.button}></Button>
                        )}
                    </Container>
                ))}
            </Container>
            
            )
    }
    
    return render()
}

function mapStateToProps(state) {
    return {
        
    }
}

export default withStyles(styles)(connect(mapStateToProps)(NoteGrid))