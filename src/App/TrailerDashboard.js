import React from 'react';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import TrailerDescription from './features/orgData/TrailerDescription';
import { useTrailer } from './features/trailer/trailer';
import { useBikeListGraphData } from './features/bikeData/bikeGraphData';
import PowerGraph from './components/PowerGraph';

const AggregateBikeData = ({ trailerId }) => {
    const trailer = useTrailer(trailerId);

    let bikeIdList = trailer.bikes.map(bike => bike.id);
    let bikeGraphData = useBikeListGraphData(bikeIdList);

    return (
        <Grid item sm={12} md={6} key={'bike'}>
            <PowerGraph data={bikeGraphData} />
        </Grid>
    );
}

const TrailerDashboard = () => {
    const trailerId = Number(useParams().trailer_id);
    const trailer = useTrailer(trailerId);

    if (trailer === null) return "No Data";

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <TrailerDescription trailer_id={trailerId} />
            </Grid>
            <Grid container item spacing={1}>
                <AggregateBikeData trailerId={trailerId} />
            </Grid>
        </Grid>
    );
};

export default TrailerDashboard;
