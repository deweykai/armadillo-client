import React, {useEffect, useState} from 'react';
import TemperatureGraph from './components/TemperatureGraph';
import OvenDescription from './features/orgData/OvenDescription';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import {getOvenData} from './api';

const OvenDashboard = () => {
    const {oven_id} = useParams();

    const [data, setData] = useState([]);
    const [temp, setTemp] = useState([]);

    useEffect(() => {
        getOvenData(oven_id)
            .then((res) => {
                if (res.ok) {
                    setData(res.data);
                    console.log(res.data);
                } else {
                    setData([]);
                }
            });
    }, [oven_id]);

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
