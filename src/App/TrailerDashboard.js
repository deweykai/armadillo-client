import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import TrailerDescription from './features/orgData/TrailerDescription';
import BikeDataGraph from './features/bikeData/BikeDataGraph';
import { useSelector } from 'react-redux';

const TrailerDashboard = () => {
    const { trailer_id } = useParams();
    const orgData = useSelector(state => state.orgData.data);

    if (orgData === null) return "No data";

    const trailer = orgData.trailers.find(trailer => trailer.id === Number(trailer_id) );

    if (trailer === undefined) return "Invalid trailer id";

    const bikeGraphs = trailer.bikes.map(bike => (
        <Grid item sm={12} md={6}>
            <BikeDataGraph bike_id={bike.id} />
        </Grid>
    ));

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <TrailerDescription trailer_id={trailer_id} />
            </Grid>
            <Grid container item spacing={1}>
                {bikeGraphs}
            </Grid>
        </Grid>
    );
};

export default TrailerDashboard;