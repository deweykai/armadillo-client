import React, {useState, useEffect} from 'react';
import {useOvenData} from '../../features/ovenData/ovenData';
import TemperatureGraph from '../TemperatureGraph';
import type {GraphData} from '../PowerGraph';

const OvenTemperatureGraph = ({ovenId}: {ovenId: number}) => {
    const data = useOvenData(ovenId);

    const [temp, setTemp] = useState<GraphData[]>([]);

    useEffect(() => {
        if (data === null) {
            setTemp([]);
        } else {
            setTemp(data.map((entry) => ({
                x: entry.created_at,
                y: entry.temperature,
            })));
        }
    }, [data]);

    if (data === null) {
        return "No oven temperature data found";
    }

    return (
        <TemperatureGraph data={temp} title="Oven Temperature" />
    );
};

export default OvenTemperatureGraph;
