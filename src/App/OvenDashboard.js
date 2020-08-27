import React from 'react';
import OvenTemperatureGraph from '../components/oven/OvenTemperatureGraph';
import OvenDescription from '../components/oven/OvenDescription';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';

const OvenDashboard = () => {
    const oven_id = Number(useParams().oven_id);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <OvenDescription oven_id={oven_id} />
                </Grid>
                <Grid item xs={12}>
                    <OvenTemperatureGraph ovenId={oven_id} />
                </Grid>
            </Grid>
        </div>
    );
};

export default OvenDashboard;
