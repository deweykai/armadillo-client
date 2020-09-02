import React, { useState } from 'react';
import Graph from './Graph';
import type {GraphData} from '../common/graphData';

const PowerGraph = ({data, missingMsg} : {data: GraphData[] | null, missingMsg: string}) => (
    <Graph data={data} missingMsg={missingMsg} />
);

export default PowerGraph;
