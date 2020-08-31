import React, {useEffect, useState} from 'react';
import SolarDescription from '../components/SolarDescription';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import SolarPowerGraph from '../components/solar/SolarPowerGraph';

const SolarDashboard = () => {
    const solar_id = Number(useParams().solar_id);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <SolarDescription solar_id={solar_id} />
                </Grid>
                <Grid item xs={12}>
                    <SolarPowerGraph solarId={solar_id} />
                </Grid>
            </Grid>
        </div>
    );
};

export default SolarDashboard;
