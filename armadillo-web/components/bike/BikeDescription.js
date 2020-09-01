import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../common/styles';
import PropTypes from 'prop-types';

const BikeDescription = ({bike_id}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.graphPaper}>
            <Typography>
                Bike: {bike_id}
            </Typography>
        </Paper>
    );
};

BikeDescription.propTypes = {
    bike_id: PropTypes.number,
};

export default BikeDescription;
