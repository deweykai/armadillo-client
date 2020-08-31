import React, { useState } from 'react';
import Graph from './Graph';
import type {GraphData} from '../common/graphData';

const PowerGraph = ({data, title, missingMsg} : {data: GraphData[] | null, title: string, missingMsg: string}) => (
    <Graph data={data} title={title} missingMsg={missingMsg} />
);

export default PowerGraph;
