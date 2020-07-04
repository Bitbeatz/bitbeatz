import React, {useEffect, useState} from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import Slider from "@material-ui/core/Slider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Build, Cancel, Person} from "@material-ui/icons";
import Radio from "@material-ui/core/Radio";
import {db} from "../firebase/firebase";
import {DEFAULT_CONTROLS, DEFAULT_LOCATIONS} from "./constants";
import {Avatar} from "@material-ui/core";

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
    }
}));

const marks = [
    {
        value: 40,
        label: '40',
    },
    {
        value: 60,
        label: '60',
    },
    {
        value: 80,
        label: '80',
    },
    {
        value: 100,
        label: '100',
    },
    {
        value: 120,
        label: '120',
    },
    {
        value: 140,
        label: '140',
    },
    {
        value: 160,
        label: '160',
    },
    {
        value: 180,
        label: '180',
    },
    {
        value: 200,
        label: '200',
    }
];

const varMarks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 20,
        label: '20%',
    },
    {
        value: 40,
        label: '40%',
    },
    {
        value: 60,
        label: '60%',
    },
    {
        value: 80,
        label: '80%',
    },
    {
        value: 100,
        label: '100%',
    }
];

const lengthMarks = [
    {
        value: 2,
        label: '2',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 8,
        label: '8',
    }
];

const Controls = (props) => {
    const classes = useStyles();
    const [tempo, setTempo] = useState(DEFAULT_CONTROLS.tempo);
    const [variation, setVariation] = useState(DEFAULT_CONTROLS.variation);
    const [loopLength, setLoopLength] = useState(DEFAULT_CONTROLS.loopLength);
    const [locations, setLocations] = useState(DEFAULT_LOCATIONS);

    const handleTempoChange = (event, newVal) => {
        setTempo(newVal);
    };

    const handleVariationChange = (event, newVal) => {
        setVariation(newVal);
    };

    const handleLengthChange = (event, newVal) => {
        setLoopLength(newVal);
    };

    useEffect(() => {
        if (!props.controls) {
            return;
        }
        setTempo(props.controls.tempo);
        setVariation(props.controls.variation);
        setLoopLength(props.controls.loopLength);
    }, [props.controls]);

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
        let previousLoc = '';
        if (locations[loc] === props.user) {
            setLocations({...locations, [loc]: ''})
        } else {
            previousLoc = getPrevLoc();
            setLocations({...locations, [previousLoc]: ''});
            setLocations({...locations, [loc]: props.user});
        }
        updateFireStoreLocations(loc, previousLoc);
    };

    const getPrevLoc = () => {
        for (const location in locations) {
            if(locations[location] === props.user) {
                return location;
            }
        }
    };

    useEffect(() => {
        if (!props.locations) {
            return;
        }
        setLocations(props.locations);
    }, [props.locations]);

    const updateFireStoreLocations = (loc, prevLoc) => {
        const updateData = loc && prevLoc ?
            {
                [`locations.${loc}`]: props.user,
                [`locations.${prevLoc}`]: ''
            } : loc ?
            {
                [`locations.${loc}`]: props.user
            } :
            {
                [`locations.${prevLoc}`]: ''
            };
        db.collection('projects').doc(props.projectId).update(updateData)
            .then(() => {
                console.log('updated locations successfully')
            })
            .catch(e => console.error(e))
    };

    useEffect(() => {
        setupBeforeUnloadListener();
    }, []);

    const setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            return handleUserLeave();
        });
    };

    const handleUserLeave = () => {
          const prevLoc = getPrevLoc();
          updateFireStoreLocations(null, prevLoc);
    };

    const render = () => {
        return (
            <Container className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        { locations.tempo === '' || locations.tempo === props.user ?
                            <FormControlLabel
                                control={
                                    <Radio
                                        icon={<Build />}
                                        checkedIcon={<Cancel />}
                                        value={'tempo'}
                                        onClick={() => handleLocationsChange('tempo')}
                                        checked={locations.tempo === props.user}
                                    />
                                }
                            /> :
                            <Avatar className={classes.avatar}>{ locations.tempo[0].toUpperCase() }</Avatar>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        Tempo (bpm)
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={tempo}
                            valueLabelFormat={tempo}
                            valueLabelDisplay="auto"
                            marks={marks}
                            max={200}
                            min={40}
                            disabled={locations.tempo !== props.user}
                            onChange={handleTempoChange}
                            onMouseUp={updateFireStoreControls}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        { locations.variation === '' || locations.variation === props.user ?
                            <FormControlLabel
                                control={
                                    <Radio
                                        icon={<Build />}
                                        checkedIcon={<Cancel />}
                                        value={'variation'}
                                        onClick={() => handleLocationsChange('variation')}
                                        checked={locations.variation === props.user}
                                    />
                                }
                            /> :
                            <Avatar className={classes.avatar}>{ locations.variation[0].toUpperCase() }</Avatar>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        Random Variation
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={variation}
                            valueLabelFormat={variation}
                            valueLabelDisplay="auto"
                            marks={varMarks}
                            disabled={locations.variation !== props.user}
                            onChange={handleVariationChange}
                            onMouseUp={updateFireStoreControls}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        {locations.loopLength === '' || locations.loopLength === props.user ?
                            <FormControlLabel
                                control={
                                    <Radio
                                        icon={<Build/>}
                                        checkedIcon={<Cancel/>}
                                        value={'loopLength'}
                                        onClick={() => handleLocationsChange('loopLength')}
                                        checked={locations.loopLength === props.user}
                                    />
                                }
                            /> :
                            <Avatar className={classes.avatar}>{locations.loopLength[0].toUpperCase()}</Avatar>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        Loop Length (beats)
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={loopLength}
                            valueLabelFormat={loopLength}
                            valueLabelDisplay="auto"
                            marks={lengthMarks}
                            step={null}
                            max={8}
                            min={2}
                            disabled={locations.loopLength !== props.user}
                            onChange={handleLengthChange}
                            onMouseUp={updateFireStoreControls}
                        />
                    </Grid>
                </Grid>
            </Container>
        )
    };

    return render()
};

function mapStateToProps(state) {
    return {
        user: state.auth.user.email,
    }
}


export default connect(mapStateToProps)(Controls)
