import React, {useState, useEffect} from 'react';
import PowerGraph from '../PowerGraph';
import {useSolarData} from '../../common/solarData';
import type {SolarData} from '../../common/solarData';
import type {GraphData} from '../../common/graphData';

const SolarPowerGraph = ({solarId} : {solarId: number}) => {
    const data: SolarData[] | null = useSolarData(solarId);
    const [power, setPower] = useState<GraphData[] | null>([]);

    useEffect(() => {
        if (data === null) {
            setPower(null);
        } else {
            setPower(data.map((entry) => ({
                x: entry.created_at,
                y: entry.power,
            })));
        }
    }, [data]);

    return (
        <PowerGraph data={power} title={"Solar Data"} missingMsg="No recent solar data available" />
    );
}

export default SolarPowerGraph;
