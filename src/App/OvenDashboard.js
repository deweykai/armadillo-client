import React, {useEffect, useState} from 'react';
import TemperatureGraph from './components/TemperatureGraph';
import OvenDescription from './features/orgData/OvenDescription';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {ovenDataSelector} from './features/sourceData/sourceDataSlice';

const OvenDashboard = () => {
    const {oven_id} = useParams();

    const data = useSelector(ovenDataSelector(oven_id));

    const [temp, setTemp] = useState([]);

    useEffect(() => {
        setTemp(data.map((entry) => ({
            x: entry.created_at.secs_since_epoch * 1000,
            y: entry.temperature,
        })));
    }, [data]);

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
