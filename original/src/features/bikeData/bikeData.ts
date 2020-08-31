import {bikeDataSelector, bikeDataListSelector} from '../sourceData/sourceDataSlice';
import type {BikeData} from '../sourceData/sourceDataSlice';
import {useSelector} from 'react-redux';

export const useBikeData = (bikeId: number) => {
    let bikeData: BikeData[] | null = useSelector(bikeDataSelector(bikeId));

    return bikeData;
};

export const useBikeListData = (bikeIdList: Array<number>) => {
    let bikeDataList: Array<BikeData[]> | null = useSelector(bikeDataListSelector(bikeIdList));

    return bikeDataList;
};
