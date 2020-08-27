import {solarDataSelector} from '../sourceData/sourceDataSlice';
import {useSelector} from 'react-redux';
import type {SolarData} from '../sourceData/sourceDataSlice';

export const useSolarData = (solarId: number) => {
    let solarData: Array<SolarData> | null = useSelector(solarDataSelector(solarId));
    return solarData;
};
