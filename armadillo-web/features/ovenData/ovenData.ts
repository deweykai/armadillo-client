import {ovenDataSelector} from '../sourceData/sourceDataSlice';
import {useSelector} from 'react-redux';
import type {OvenData} from '../sourceData/sourceDataSlice';

export const useOvenData = (ovenId: number) => {
    let ovenData: OvenData[] | null = useSelector(ovenDataSelector(ovenId));
    return ovenData;
};
