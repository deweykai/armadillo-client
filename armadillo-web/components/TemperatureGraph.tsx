import React from 'react';
import Graph from './Graph';
import type {GraphData} from '../common/graphData';

const TemperatureGraph = ({ data, missingMsg }: { data: GraphData[] | null, missingMsg: string }) => {
    return (
        <Graph missingMsg={missingMsg} data={data} />
    );
};

export default TemperatureGraph;
