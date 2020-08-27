import React from 'react';
import Graph from './Graph';
import type {GraphData} from '../common/graphData';

const TemperatureGraph = ({ data, title, missingMsg }: { data: GraphData[] | null, title: string, missingMsg: string }) => {
    return (
        <Graph title={title} missingMsg={missingMsg} data={data} />
    );
};

export default TemperatureGraph;
