import React, {useState, useEffect} from 'react';
import PowerGraph from '../PowerGraph';
import {useSolarData} from '../../features/solarData/solarData';
import type {SolarData} from '../../features/sourceData/sourceDataSlice';
import type {GraphData} from '../../common/graphData';

const SolarPowerGraph = ({solarId} : {solarId: number}) => {
    const data: SolarData[] | null = useSolarData(solarId);
    const [power, setPower] = useState<GraphData[]>([]);

    useEffect(() => {
        if (data === null) {
            setPower([]);
        } else {
            setPower(data.map((entry) => ({
                x: entry.created_at,
                y: entry.power,
            })));
        }
    }, [data]);

    if (data === null) {
        return "No recent solar data available";
    }

    return (
        <PowerGraph data={power} title={"Solar Data"} />
    );
}

export default SolarPowerGraph;
