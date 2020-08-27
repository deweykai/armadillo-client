import React, {useEffect, useState} from 'react';
import PowerGraph from '../PowerGraph';
import {useBikeData} from '../../features/bikeData/bikeData';
import type {BikeData} from '../../features/sourceData/sourceDataSlice';
import type {GraphData} from '../../common/graphData';

const mapBikeGraphData = (bike: BikeData) => ({
    x: bike.created_at, // time
    y: bike.current * bike.voltage, // power
});

const BikePowerGraph = ({bike_id} : {bike_id: number}) => {
    // assume that the data is valid since this component should only render when the data is present.
    const bikeData = useBikeData(bike_id);

    const [data, setData] = useState<Array<GraphData> | null>([]);
    //
    // only recalculate when new data is avaliable.
    useEffect(() => {
        if (bikeData === null) {
            setData(null);
        } else {
            setData(bikeData.map(mapBikeGraphData));
        }
    }, [bikeData]);

    if (data === null) {
        return "Bike Data Missing";
    }

    return (
        <PowerGraph data={data} title={"Bike Power"} />
    );
};

export default BikePowerGraph;
