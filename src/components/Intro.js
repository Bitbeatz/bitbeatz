import React from 'react'
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
});

const Intro = (props) => {
    const { classes } = props
    const render = () => (
        <div>
            <Typography variant="h2" align="center">
                Bitbeatz
            </Typography>
            <Typography variant="h4" align="center">
                Unleash the power of genetic algorithms.
            </Typography>
            <Typography variant="h4" align="center">
                Create music with friends.
            </Typography>
        </div>
    )
    return render()
}

export default withStyles(styles)(Intro)
