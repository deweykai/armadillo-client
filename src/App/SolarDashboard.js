import React, {useEffect, useState} from 'react';
import PowerGraph from '../components/PowerGraph';
import SolarDescription from '../components/SolarDescription';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import {useSolarPowerGraphData} from '../features/solarData/solarGraphData';

const SolarDashboard = () => {
    const solar_id = Number(useParams().solar_id);

    const power = useSolarPowerGraphData(solar_id);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <SolarDescription solar_id={solar_id} />
                </Grid>
                <Grid item xs={12}>
                    <PowerGraph data={power} title={"Solar Data"} />
                </Grid>
            </Grid>
        </div>
    );
};

export default SolarDashboard;
