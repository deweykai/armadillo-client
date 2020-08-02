import React, {useEffect, useState} from 'react';
import PowerGraph from './components/PowerGraph';
import MicrogridDescription from './features/orgData/MicrogridDescription';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {microgridDataSelector} from './features/sourceData/sourceDataSlice';

const OvenDashboard = () => {
    const {microgrid_id} = useParams();

    const data = useSelector(microgridDataSelector(microgrid_id));
    const [power, setPower] = useState([]);

    useEffect(() => {
        setPower(data.map((entry) => ({
            x: entry.created_at.secs_since_epoch * 1000,
            y: entry.power,
        })));
    }, [data]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <MicrogridDescription microgrid_id={microgrid_id} />
                </Grid>
                <Grid item xs={12}>
                    <PowerGraph data={power} />
                </Grid>
            </Grid>
        </div>
    );
};

export default OvenDashboard;
