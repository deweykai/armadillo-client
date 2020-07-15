import React, { useState, useEffect } from 'react';
import BikeDataTable from './BikeDataTable.js';
import BikeDataGraph from './BikeDataGraph.js';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';


const BikeDashboard = () => {
    let { bike_id } = useParams();
    let [bikeData, setBikeData] = useState(null);

    useEffect(() => {
        const updateData = () => fetch(`/api/data/bike/${bike_id}`)
            .then(res => res.json())
            .then(raw_data => raw_data.map(data => ({
                ...data,
                created_at: data.created_at.secs_since_epoch * 1000,
            })))
            .then(data => setBikeData(data));

        updateData();

        let interval = setInterval(updateData, 1000);

        return () => {
            clearInterval(interval);
            setBikeData(null);
        };
    }, [bike_id]);

    if (bikeData == null) {
        return "Waiting for data";
    }

    return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BikeDataGraph bikeData={bikeData} />
          </Grid>
          <Grid item xs={12}>
            <BikeDataTable bikeData={bikeData} />
          </Grid>
        </Grid>
    );
};

export default BikeDashboard;
