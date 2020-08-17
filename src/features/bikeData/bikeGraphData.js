import {useState, useEffect} from 'react';
import {useBikeData, useBikeListData} from './bikeData';
import {sumArrays} from '../../common/sumArray';


const mapBikeGraphData = (bike) => ({
    x: bike.created_at, // time
    y: bike.current * bike.voltage, // power
});

export const useBikeListGraphData = (bikeIdList) => {
    const bikeDataList = useBikeListData(bikeIdList);

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(sumArrays(bikeDataList.map(bikeData => bikeData.map(mapBikeGraphData))));
    }, bikeDataList);

    return data;
};

export const useBikeGraphData = (bikeId) => {
    // assume that the data is valid since this component should only render when the data is present.
    const bikeData = useBikeData(bikeId);

    const [data, setData] = useState([]);
    //
    // only recalculate when new data is avaliable.
    useEffect(() => setData(bikeData.map(mapBikeGraphData)), [bikeData]);

    return data;
};
