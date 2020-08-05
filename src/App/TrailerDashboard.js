import React from 'react';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import TrailerDescription from './features/orgData/TrailerDescription';
import { useBikeListGraphData } from './features/bikeData/bikeGraphData';
import PowerGraph from './components/PowerGraph';
import {useSelector} from 'react-redux';

const sumArrays = (data) => {
    // expects a list of arrays
    console.assert(data[0] !== undefined);

    // use longest array
    let longestLength = 0;
    let longestIndex = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].length > longestLength) {
            longestLength = data[i].length;
            longestIndex = i;
        }
    }

    let sumArray = [];
    for (let i = 0; i < longestLength; i++) {
        let sum;
        for (let j = 0; j < data.length; j++) {
            sum += data[i].y || 0;
        }
        sum.x = data[longestIndex].x;
        sumArray.push(sum);
    }

    return sumArray;
};

const AggregateBikeData = ({ trailer_id }) => {
    const orgData = useSelector((state) => state.orgData.data);
    const trailer = orgData.trailers.find((trailer) => trailer.id === Number(trailer_id));

    let bikeIdList = trailer.bikes.map(bike => bike.id);
    let bikeGraphData = useBikeListGraphData(bikeIdList);

    return (
        <Grid item sm={12} md={6} key={'bike'}>
            <PowerGraph data={bikeGraphData} />
        </Grid>
    );
}

const TrailerDashboard = () => {
    const {trailer_id} = useParams();
    const orgData = useSelector((state) => state.orgData.data);

    if (orgData === null) return 'No data';

    const trailer = orgData.trailers.find((trailer) => trailer.id === Number(trailer_id));

    if (trailer === undefined) return 'Invalid trailer id';

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <TrailerDescription trailer_id={trailer_id} />
            </Grid>
            <Grid container item spacing={1}>
                <AggregateBikeData trailer_id={trailer_id} />
            </Grid>
        </Grid>
    );
};

export default TrailerDashboard;
