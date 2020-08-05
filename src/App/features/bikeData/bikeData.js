import {bikeDataSelector, bikeDataListSelector} from '../sourceData/sourceDataSlice';
import {useSelector} from 'react-redux';

export const useBikeData = (bikeId) => {
    let bikeData = useSelector(bikeDataSelector(bikeId));
    return bikeData;
};

export const useBikeListData = (bikeIdList) => {
    let bikeDataList = useSelector(bikeDataListSelector(bikeIdList));
    return bikeDataList;
};
