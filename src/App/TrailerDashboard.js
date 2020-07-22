import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import TrailerDescription from './features/orgData/TrailerDescription';

const TrailerDashboard = () => {
    const { trailer_id } = useParams();

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <TrailerDescription trailer_id={trailer_id} />
            </Grid>
        </Grid>
    );
};

export default TrailerDashboard;