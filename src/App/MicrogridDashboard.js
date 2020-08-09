import React, {useEffect, useState} from 'react';
import PowerGraph from './components/PowerGraph';
import MicrogridDescription from './components/MicrogridDescription';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import {useSolarPowerGraphData} from './features/solarData/solarGraphData';

const MicrogridDashboard = () => {
    const {microgrid_id} = useParams();

    const power = useSolarPowerGraphData(microgrid_id);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <MicrogridDescription microgrid_id={microgrid_id} />
                </Grid>
                <Grid item xs={12}>
                    <PowerGraph data={power} title={"Solar Data"} />
                </Grid>
            </Grid>
        </div>
    );
};

export default MicrogridDashboard;
