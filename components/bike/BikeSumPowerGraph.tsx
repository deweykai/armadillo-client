import React, {useEffect, useState} from 'react';
import PowerGraph from '../PowerGraph';
import {useBikeListData} from '../../common/bikeData';
import type {GraphData} from '../../common/graphData';
import {mapBikeGraphData} from './BikePowerGraph';
import {sumArrays} from '../../common/sumArray';

const BikeSumPowerGraph = ({bikeIdList} : {bikeIdList: number[]}) => {
    // assume that the data is valid since this component should only render when the data is present.
    const bikeDataList = useBikeListData(bikeIdList);

    const [data, setData] = useState<GraphData[] | null>([]);

    //
    // only recalculate when new data is avaliable.
    useEffect(() => {
        if (bikeDataList !== null) {
            setData(sumArrays(bikeDataList.map(bikeData => bikeData.map(mapBikeGraphData))));
        } else {
            setData(null);
        }
    }, [bikeDataList]);

    return (
        <PowerGraph data={data} missingMsg="missing bike data" />
    );
};

export default BikeSumPowerGraph;
