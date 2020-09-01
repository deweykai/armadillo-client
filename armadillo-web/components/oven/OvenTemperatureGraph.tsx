import React, {useState, useEffect} from 'react';
import {useOvenData} from '../../common/ovenData';
import TemperatureGraph from '../TemperatureGraph';
import type {GraphData} from '../../common/graphData';

const OvenTemperatureGraph = ({ovenId}: {ovenId: number}) => {
    const data = useOvenData(ovenId);

    const [temp, setTemp] = useState<GraphData[] | null>(null);

    useEffect(() => {
        if (data === null) {
            setTemp(null);
        } else {
            setTemp(data.map((entry) => ({
                x: entry.created_at,
                y: entry.temperature,
            })));
        }
    }, [data]);

    return (
        <TemperatureGraph data={temp} title="Oven Temperature" missingMsg="No solar oven temperature data available" />
    );
};

export default OvenTemperatureGraph;
