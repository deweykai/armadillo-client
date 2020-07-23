import React from 'react';
import BikeDataTable from './BikeDataTable.js';
import BikeDataGraph from './features/bikeData/BikeDataGraph.js';
import BikeDataIndicator from './features/bikeData/BikeDataIndicator';
import BikeDescription from './features/orgData/BikeDescription';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { bikeDataSelector } from './features/bikeData/bikeDataSlice';
import { useSelector } from 'react-redux';

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
          <BikeDataGraph bike_id={bike_id} />
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
