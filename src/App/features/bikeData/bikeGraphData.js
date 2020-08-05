import {useState, useEffect} from 'react';
import {useBikeData, useBikeListData} from './bikeData';

const sumArrays = (data) => {
    // expects a list of arrays
    console.assert(data[0] !== undefined);

    // use longest array
    let longestLength = -1;
    let longestIndex = -1;

    for (let i = 0; i < data.length; i++) {
        if (data[i].length > longestLength) {
            longestLength = data[i].length;
            longestIndex = i;
        }
    }

    console.log(longestLength, longestIndex);

    let sumArray = [];
    for (let i = 0; i < longestLength; i++) {
        let ySum = 0;
        for (let j = 0; j < data.length; j++) {
            if (data[j][i] === undefined) continue;
            ySum += data[j][i].y || 0;
        }
        let sum = {
            y: ySum,
            x: data[longestIndex][i].x,
        };
        sumArray.push(sum);
    }

    return sumArray;
};

const mapBikeGraphData = (bike) => ({
    x: bike.created_at.secs_since_epoch * 1000, // time
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
