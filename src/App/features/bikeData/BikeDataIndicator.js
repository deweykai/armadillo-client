import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { bikeDataSelector } from './bikeDataSlice';
import { useSelector } from 'react-redux';
import useStyles from '../../styles';

const BikeDataIndicator = ({ bike_id }) => {
    const classes = useStyles();
    const bikeData = useSelector(bikeDataSelector(bike_id)).data;

    return (
        <Paper className={classes.graphPaper}>
            <Typography>
                Current: {bikeData[0].current}
            </Typography>
            <Typography>
                Voltage: {bikeData[0].voltage}
            </Typography>
            <Typography>
                RPM: {bikeData[0].rpm}
            </Typography>
        </Paper>
    )
}
export default BikeDataIndicator;