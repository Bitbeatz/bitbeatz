import React, {useState} from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import Slider from "@material-ui/core/Slider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Build, Cancel} from "@material-ui/icons";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
        padding: 20,
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
    const [tempo, setTempo] = useState(100);
    const [variation, setVariation] = useState(10);
    const [loopLength, setLoopLength] = useState(4);
    const [checked, setChecked] = useState('');

    const handleTempoChange = (event, newVal) => {
        setTempo(newVal);
    };

    const handleVariationChange = (event, newVal) => {
        setVariation(newVal);
    };

    const handleLengthChange = (event, newVal) => {
        setLoopLength(newVal);
    };

    const handleChecked = (val) => {
        if (checked === val) {
            setChecked('');
        }
        else {
            setChecked(val);
        }
    };

    const render = () => {
        return (
            <Container className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <FormControlLabel
                            control={
                                <Radio
                                    icon={<Build />}
                                    checkedIcon={<Cancel />}
                                    value={'tempo'}
                                    onClick={() => handleChecked('tempo')}
                                    checked={checked === 'tempo'}
                                />
                            }
                        />
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
                            disabled={checked !== 'tempo'}
                            onChange={handleTempoChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <FormControlLabel
                            control={
                                <Radio
                                    icon={<Build />}
                                    checkedIcon={<Cancel />}
                                    value={'variation'}
                                    onClick={() => handleChecked('variation')}
                                    checked={checked === 'variation'}
                                />
                            }
                        />
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
                            disabled={checked !== 'variation'}
                            onChange={handleVariationChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                        <FormControlLabel
                            control={
                                <Radio
                                    icon={<Build />}
                                    checkedIcon={<Cancel />}
                                    value={'length'}
                                    onClick={() => handleChecked('length')}
                                    checked={checked === 'length'}
                                />
                            }
                        />
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
                            disabled={checked !== 'length'}
                            onChange={handleLengthChange}
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
