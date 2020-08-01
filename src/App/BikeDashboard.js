import React from 'react';
import BikeDataIndicator from './features/bikeData/BikeDataIndicator';
import BikeDescription from './features/orgData/BikeDescription';
import BikePowerGraph from './features/bikeData/BikePowerGraph';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';

const BikeDashboard = () => {
  const { bike_id } = useParams();

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
  /*
        <Grid item xs={12}>
          <BikeDataTable bikeData={bikeData} />
        </Grid>*/
};

export default BikeDashboard;
