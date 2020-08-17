import React from 'react';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import TrailerDescription from '../components/TrailerDescription';
import { useTrailer } from '../features/trailer/trailer';
import { useBikeListGraphData } from '../features/bikeData/bikeGraphData';
import { useOvenTemperatureGraphData} from '../features/ovenData/ovenGraphData';
import { useSolarPowerGraphData} from '../features/solarData/solarGraphData';
import PowerGraph from '../components/PowerGraph';
import TemperatureGraph from '../components/TemperatureGraph';

const OvenData = ({ trailerId }) => {
    const trailer = useTrailer(trailerId);
    const ovenId = trailer.ovens[0];
    const tempData = useOvenTemperatureGraphData(ovenId);

    return (<TemperatureGraph data={tempData} title={"Oven Temperature"} />);
};

const SolarData = ({ trailerId }) => {
    const trailer = useTrailer(trailerId);
    const solarId = trailer.microgrids[0];
    const powerData = useSolarPowerGraphData(solarId);

    return (
        <PowerGraph data={powerData} title={"Solar Power"} />
    );
};

const AggregateBikeData = ({ trailerId }) => {
    const trailer = useTrailer(trailerId);

    const bikeGraphData = useBikeListGraphData(trailer.bikes);

    return (
        <PowerGraph data={bikeGraphData} title={"Bike Data"} />
    );
}

const TrailerDashboard = () => {
    const trailerId = Number(useParams().trailer_id);
    const trailer = useTrailer(trailerId);

    if (trailer === null) return "No Data";

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TrailerDescription trailer_id={trailerId} />
            </Grid>
            <Grid container item spacing={1}>
                <Grid item sm={12} md={4} key={'bike'}>
                    <AggregateBikeData trailerId={trailerId} />
                </Grid>
                <Grid item sm={12} md={4} key={'solar'}>
                    <SolarData trailerId={trailerId} />
                </Grid>
                <Grid item sm={12} md={4} key={'oven'}>
                    <OvenData trailerId={trailerId} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TrailerDashboard;
