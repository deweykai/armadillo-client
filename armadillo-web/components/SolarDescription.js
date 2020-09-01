import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from '../common/styles';
import PropTypes from 'prop-types';

const SolarDescription = ({solar_id}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.graphPaper}>
            <Typography>
                Solar Microgrid: {solar_id}
            </Typography>
        </Paper>
    );
};

SolarDescription.propTypes = {
    solar_id: PropTypes.number,
};

export default SolarDescription;
