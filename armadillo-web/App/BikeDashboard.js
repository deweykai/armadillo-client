import React from 'react';
import BikeDataIndicator from '../features/bikeData/BikeDataIndicator';
import BikeDescription from '../components/bike/BikeDescription';
import BikePowerGraph from '../components/bike/BikePowerGraph';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';

const BikeDashboard = () => {
    const bike_id = Number(useParams().bike_id);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <BikeDescription bike_id={bike_id} />
                </Grid>
                <Grid item xs={3}>
                    <BikeDataIndicator bike_id={bike_id} />
                </Grid>
                <Grid item xs={12}>
                    <BikePowerGraph bike_id={bike_id} />
                </Grid>
            </Grid>
        </div>
    );
};

export default BikeDashboard;
