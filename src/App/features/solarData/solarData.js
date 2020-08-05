import {solarDataSelector} from '../sourceData/sourceDataSlice';
import {useSelector} from 'react-redux';

export const useOvenData = (solarId) => {
    let solarData = useSelector(solarDataSelector(solarId));
    return solarData;
};
