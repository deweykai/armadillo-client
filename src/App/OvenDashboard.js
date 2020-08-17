import React, {useEffect, useState} from 'react';
import TemperatureGraph from '../components/TemperatureGraph';
import OvenDescription from '../components/oven/OvenDescription';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import {useOvenTemperatureGraphData} from '../features/ovenData/ovenGraphData';

const OvenDashboard = () => {
    const oven_id = Number(useParams().oven_id);

    const temp = useOvenTemperatureGraphData(oven_id);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <OvenDescription oven_id={oven_id} />
                </Grid>
                <Grid item xs={12}>
                    <TemperatureGraph data={temp} title={"Oven Temperature"} />
                </Grid>
            </Grid>
        </div>
    );
};

export default OvenDashboard;
