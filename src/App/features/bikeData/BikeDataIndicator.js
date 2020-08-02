import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {bikeDataSelector} from './bikeDataSlice';
import {useSelector} from 'react-redux';
import useStyles from '../../styles';
import PropTypes from 'prop-types';

const BikeDataIndicator = ({bike_id}) => {
    const classes = useStyles();
    const data = useSelector(bikeDataSelector(bike_id));

    let status;
    if (data.length === 0) {
        status = (
            <Typography>
                Not connected to bike
            </Typography>
        );
    } else {
        status = (
            <div>
                <Typography>
                    Current: {data[0].current}
                </Typography>
                <Typography>
                    Voltage: {data[0].voltage}
                </Typography>
                <Typography>
                    RPM: {data[0].rpm}
                </Typography>
            </div>
        );
    }

    return (
        <Paper className={classes.graphPaper}>
            {status}
        </Paper>
    );
};

BikeDataIndicator.propTypes = {
    bike_id: PropTypes.number,
};
export default BikeDataIndicator;
