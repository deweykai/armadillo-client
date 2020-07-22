import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { bikeDataSelector } from './bikeDataSlice';
import { useSelector } from 'react-redux';
import useStyles from '../../styles';

const BikeDataIndicator = ({ bike_id }) => {
    const classes = useStyles();
    const bike = useSelector(bikeDataSelector(bike_id));

    let status;
    if (bike.fetchStatus === 'fresh') {
        status = (
            <Typography>
                Not connected to bike
            </Typography>
        );
    } else if (bike.fetchStatus === 'success') {
        status = (
            <div>
                <Typography>
                    Current: {bike.data[0].current}
                </Typography>
                <Typography>
                    Voltage: {bike.data[0].voltage}
                </Typography>
                <Typography>
                    RPM: {bike.data[0].rpm}
                </Typography>
            </div>
        )
    }

    return (
        <Paper className={classes.graphPaper}>
            {status}
        </Paper>
    )
}
export default BikeDataIndicator;