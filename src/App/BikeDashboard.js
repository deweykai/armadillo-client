import React, { useEffect } from 'react';
import BikeDataTable from './BikeDataTable.js';
import BikeDataGraph from './BikeDataGraph.js';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { bikeDataSelector } from '../features/bikeData/bikeDataSlice';
import { useSelector } from 'react-redux';
import BikeDataSocket from '../features/bikeData/BikeDataSocket';


const BikeDashboard = () => {
    const { bike_id } = useParams();
    const bikeData = useSelector(bikeDataSelector( bike_id ));

    if (bikeData == null || bikeData.status === 'loading') {
      return "waiting for data";
    }

    if (bikeData.status === 'failed') {
      return "failed to load data";
    }

    if (bikeData.status !== 'success') {
      console.log(bikeData);
      return "data not loaded";
    }

    return (
      <div>
        <BikeDataSocket bike_id={ bike_id } />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BikeDataGraph bikeData={bikeData.data} />
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
