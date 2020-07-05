import React, {useEffect, useState} from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Build, Cancel } from '@material-ui/icons';
import Radio from '@material-ui/core/Radio';
import {db} from '../firebase/firebase';
import {DEFAULT_CONTROLS, DEFAULT_LOCATIONS, lengthMarks, varMarks, marks} from './constants';
import {Avatar} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
        padding: 20,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    generateButton: {
        marginTop: 20
    }
}));



const Controls = (props) => {
    const classes = useStyles();
    const [tempo, setTempo] = useState(DEFAULT_CONTROLS.tempo);
    const [variation, setVariation] = useState(DEFAULT_CONTROLS.variation);
    const [loopLength, setLoopLength] = useState(DEFAULT_CONTROLS.loopLength);
    const [locations, setLocations] = useState({[props.username]: ''});
    const [locked, setLocked] = useState(DEFAULT_LOCATIONS);

    useEffect(() => {
        window.addEventListener('beforeunload', (ev) => {
            ev.preventDefault();
            updateFireStoreLocations('');
        });
    }, []);

    useEffect(() => {
        if (!props.controls) {
            return;
        }
        setTempo(props.controls.tempo);
        setVariation(props.controls.variation);
        setLoopLength(props.controls.loopLength);
    }, [props.controls]);

    useEffect(() => updateFireStoreControls(), [loopLength])

    useEffect(() => {
        if (!props.locations) {
            return;
        }
        setLocations(props.locations);
        const lockObj = {};
        for (const user in props.locations) {
            if(user !== props.username) {
                lockObj[props.locations[user]] = user;
            }
        }
        setLocked({
            tempo: lockObj.tempo ? lockObj.tempo.toUpperCase()[0] : '',
            variation: lockObj.variation ? lockObj.variation.toUpperCase()[0] : '',
            loopLength: lockObj.loopLength ? lockObj.loopLength.toUpperCase()[0] : ''
        })
    }, [props.locations, props.username]);

    const handleTempoChange = (event, newVal) => {
        setTempo(newVal);
    };

    const handleVariationChange = (event, newVal) => {
        setVariation(newVal);
    };

    const handleLengthChange = (event, newVal) => {
        setLoopLength(newVal);
    };


    const updateFireStoreControls = () => {
        db.collection('projects').doc(props.projectId).update({
            controls:
                { tempo: tempo,
                    variation: variation,
                    loopLength: loopLength
                }
        })
            .then(() => {
                console.log('updated controls successfully')
            })
            .catch(e => console.error(e))
    };

    const handleLocationsChange = (loc) => {
        if (locations[props.username] === loc) {
            setLocations[props.username] = '';
            updateFireStoreLocations('');
        } else {
            setLocations[props.username] = loc;
            updateFireStoreLocations(loc);
        }
    };

    const updateFireStoreLocations = (loc) => {
        const updateData = {[`locations.${props.username}`]: loc};

        db.collection('projects').doc(props.projectId).update(updateData)
            .then(() => {
                console.log('updated locations successfully')
            })
            .catch(e => console.error(e))
    };

    const render = () => {
        return (
            <Container className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        { !locked.tempo ?
                            <FormControlLabel
                                control={
                                    <Radio
                                        icon={<Build />}
                                        checkedIcon={<Cancel />}
                                        value={'tempo'}
                                        onClick={() => handleLocationsChange('tempo')}
                                        checked={locations[props.username] === 'tempo'}
                                    />
                                }
                            /> :
                            <Avatar className={classes.avatar}>{ locked.tempo }</Avatar>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        Tempo (bpm)
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={tempo}
                            valueLabelDisplay="auto"
                            marks={marks}
                            max={200}
                            min={40}
                            disabled={locations[props.username] !== 'tempo'}
                            onChange={handleTempoChange}
                            onMouseUp={updateFireStoreControls}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        { !locked.variation ?
                            <FormControlLabel
                                control={
                                    <Radio
                                        icon={<Build />}
                                        checkedIcon={<Cancel />}
                                        value={'variation'}
                                        onClick={() => handleLocationsChange('variation')}
                                        checked={locations[props.username] === 'variation'}
                                    />
                                }
                            /> :
                            <Avatar className={classes.avatar}>{ locked.variation }</Avatar>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        Random Variation
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={variation}
                            valueLabelDisplay="auto"
                            marks={varMarks}
                            disabled={locations[props.username] !== 'variation'}
                            onChange={handleVariationChange}
                            onMouseUp={updateFireStoreControls}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        { !locked.loopLength ?
                            <FormControlLabel
                                control={
                                    <Radio
                                        icon={<Build/>}
                                        checkedIcon={<Cancel/>}
                                        value={'loopLength'}
                                        onClick={() => handleLocationsChange('loopLength')}
                                        checked={locations[props.username] === 'loopLength'}
                                    />
                                }
                            /> :
                            <Avatar className={classes.avatar}>{ locked.loopLength }</Avatar>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        Loop Length (beats)
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={loopLength}
                            valueLabelDisplay="auto"
                            marks={lengthMarks}
                            step={null}
                            max={8}
                            min={2}
                            disabled={locations[props.username] !== 'loopLength'}
                            onChange={handleLengthChange}
                        />
                    </Grid>
                </Grid>
                <Button variant={'contained'} color={'primary'} className={classes.generateButton}>
                    GENERATE PERCUSSION
                </Button>
            </Container>
        )
    };

    return render()
};

function mapStateToProps(state) {
    const user = state.auth.user.email;
    let username = '';
    if (user.includes('.com')) {
        username = state.auth.user.email.split('.com')[0];
    }
    else if (user.includes('.ca')) {
        username = state.auth.user.email.split('.ca')[0];
    }
    else if (user.includes('.org')) {
        username = state.auth.user.email.split('.org')[0];
    }
    else if (user.includes('.net')) {
        username = state.auth.user.email.split('.net')[0];
    }
    else {
        username = state.auth.user.email.split('.')[0];
    }
    return {
        user: user,
        username: username
    }
}


export default connect(mapStateToProps)(Controls)
