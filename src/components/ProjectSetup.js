import React, { useState } from 'react'
import {ThemeProvider, withStyles} from '@material-ui/styles'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { createMuiTheme } from '@material-ui/core/styles'

const styles = () => ({
    '@global': {
        body: {
            backgroundColor: '#e9e9e9',
        },
    },
    paper: {
        marginTop: 100,
        display: 'flex',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        marginTop: 1,
    },
    left: {
        alignSelf: 'flex-start'
    },
    createButton: {
        alignSelf: 'flex-end',
        marginTop: '20px'
    }
});

const ProjectSetup = (props) => {
    const [genre, setGenre] = useState('');
    const [projectName, setProjectName] = useState('');
    const tooltipInfo = "Selecting a genre will give you a template to start your project";

    const theme = createMuiTheme({
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: '#4791db',
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#81c784',
            },
        },
    });

    const handleNameChange = ({target}) => {
        setProjectName(target.value);
    };

    const createProject = () => {

    };

    const render = () => {
        const { classes } = props;
        return (
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Create New Project
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="projectName"
                        label="Project Name"
                        name="projectName"
                        onChange={handleNameChange}
                    />
                    <Typography component="genre" variant="subtitle1" className={classes.left}>
                        <span>
                        Select a Genre Template
                        <Tooltip title={tooltipInfo}>
                            <Fab color={"primary"}>
                                More Info
                            </Fab>
                        </Tooltip>
                            </span>
                    </Typography>

                    <ThemeProvider theme={theme}>

                        <ButtonGroup>
                            <Button variant="contained" color={genre === 'jazz' ? 'primary' : ''} onClick={() => setGenre('jazz')}>
                                Jazz
                            </Button>
                            <Button variant="contained" color={genre === 'rock' ? 'primary' : ''} onClick={() => setGenre('rock')}>
                                Rock
                            </Button>
                            <Button variant="contained" color={genre === 'clas' ? 'primary' : ''} onClick={() => setGenre('clas')}>
                                Classical
                            </Button>
                            <Button variant="contained" color={genre === 'edm' ? 'primary' : ''} onClick={() => setGenre('edm')}>
                                EDM
                            </Button>
                        </ButtonGroup>
                        <Typography component="or" variant="body2">
                            or
                        </Typography>
                        <Button variant="contained" color={genre === 'blank' ? 'primary' : ''} onClick={() => setGenre('blank')}>
                            Start From Scratch
                        </Button>
                        <Button variant="contained" color='secondary' className={classes.createButton} onClick={createProject}>
                            Create Project
                        </Button>
                    </ThemeProvider>
                </Paper>
            </Container>
        )
    };

    return render()
};


export default withStyles(styles)(ProjectSetup)
