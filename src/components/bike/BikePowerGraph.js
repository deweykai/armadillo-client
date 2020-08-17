import React from 'react';
import {useBikeGraphData} from '../../features/bikeData/bikeGraphData';
import PowerGraph from '../PowerGraph';

const BikePowerGraph = ({bike_id}) => {
    const bikeGraphData = useBikeGraphData(bike_id);

    return (
        <PowerGraph data={bikeGraphData} title={"Bike Power"} />
    );
};

export default BikePowerGraph;
