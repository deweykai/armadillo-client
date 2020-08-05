import React, {useEffect, useState} from 'react';
import TemperatureGraph from './components/TemperatureGraph';
import OvenDescription from './features/orgData/OvenDescription';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import {useOvenTemperatureGraphData} from './features/ovenData/ovenGraphData';

const OvenDashboard = () => {
    const {oven_id} = useParams();

    const temp = useOvenTemperatureGraphData(oven_id);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <OvenDescription oven_id={oven_id} />
                </Grid>
                <Grid item xs={12}>
                    <TemperatureGraph data={temp} />
                </Grid>
            </Grid>
        </div>
    );
};

export default OvenDashboard;
