import React from 'react';
import BikeDataIndicator from '../features/bikeData/BikeDataIndicator';
import BikeDescription from '../components/bike/BikeDescription';
import { useBikeGraphData } from '../features/bikeData/bikeGraphData';
import PowerGraph from '../components/PowerGraph';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';

const BikeDashboard = () => {
    const bike_id = Number(useParams().bike_id);

    const bikeGraphData = useBikeGraphData(bike_id);

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
                    <PowerGraph data={bikeGraphData} title={"Bike Power"}/>
                </Grid>
            </Grid>
        </div>
    );
    /*
        <Grid item xs={12}>
          <BikeDataTable bikeData={bikeData} />
        </Grid>*/
};

export default BikeDashboard;
