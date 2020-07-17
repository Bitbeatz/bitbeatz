import React, {useEffect, useState} from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {LockOpen, Lock } from '@material-ui/icons';
import Radio from '@material-ui/core/Radio';
import {db} from '../firebase/firebase';
import {DEFAULT_CONTROLS, DEFAULT_LOCATIONS, lengthMarks, varMarks, marks} from './constants';
import {Avatar} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";

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
                                        icon={<Lock />}
                                        checkedIcon={<LockOpen />}
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
                        {locations[props.username] !== 'tempo' ?
                            <Tooltip
                                title={'Tempo is Locked'}
                                arrow
                                placement={'left-start'}>
                                <div>
                                    <Slider
                                        value={tempo}
                                        valueLabelDisplay="auto"
                                        marks={marks}
                                        max={200}
                                        min={40}
                                        disabled={true}
                                    />
                                </div>
                            </Tooltip> :
                            <Slider
                                value={tempo}
                                valueLabelDisplay="auto"
                                marks={marks}
                                max={200}
                                min={40}
                                disabled={false}
                                onChange={handleTempoChange}
                                onChangeCommitted={updateFireStoreControls}
                            />
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        { !locked.variation ?
                            <FormControlLabel
                                control={
                                    <Radio
                                        icon={<Lock />}
                                        checkedIcon={<LockOpen />}
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
                        {locations[props.username] !== 'variation' ?
                            <Tooltip
                                title={'Random Variation is Locked'}
                                arrow
                                placement={'left-start'}>
                                <div>
                                    <Slider
                                        value={variation}
                                        valueLabelDisplay="auto"
                                        marks={varMarks}
                                        disabled={true}
                                    />
                                </div>
                            </Tooltip> :
                            <Slider
                                value={variation}
                                valueLabelDisplay="auto"
                                marks={varMarks}
                                disabled={false}
                                onChange={handleVariationChange}
                                onChangeCommitted={updateFireStoreControls}
                            />
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        { !locked.loopLength ?
                            <FormControlLabel
                                control={
                                    <Radio
                                        icon={<Lock />}
                                        checkedIcon={<LockOpen />}
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
                        {locations[props.username] !== 'loopLength' ?
                            <Tooltip
                                title={'Loop Length is Locked'}
                                arrow
                                placement={'left-start'}>
                                <div>
                                    <Slider
                                        value={loopLength}
                                        valueLabelDisplay="auto"
                                        marks={lengthMarks}
                                        step={null}
                                        max={8}
                                        min={2}
                                        disabled={true}
                                    />
                                </div>
                            </Tooltip> :
                            <Slider
                                value={loopLength}
                                valueLabelDisplay="auto"
                                marks={lengthMarks}
                                step={null}
                                max={8}
                                min={2}
                                disabled={false}
                                onChange={handleLengthChange}
                                onChangeCommitted={updateFireStoreControls}
                            />
                        }
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


export default connect(mapStateToProps)(Controls)
