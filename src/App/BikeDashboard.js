import React, { useEffect } from 'react';
import BikeDataTable from './BikeDataTable.js';
import BikeDataGraph from '../features/bikeData/BikeDataGraph.js';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { fetchBikeData, bikeDataSelector } from '../features/bikeData/bikeDataSlice';
import { useSelector, useDispatch } from 'react-redux';


const BikeDashboard = () => {
    const { bike_id } = useParams();
    const bikeData = useSelector(bikeDataSelector( bike_id ));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBikeData(bike_id));
    }, [bike_id, dispatch]);

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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BikeDataGraph bikeData={bikeData.data} />
          </Grid>
        </Grid>
    );
    /*
          <Grid item xs={12}>
            <BikeDataTable bikeData={bikeData} />
          </Grid>*/
};

export default BikeDashboard;
