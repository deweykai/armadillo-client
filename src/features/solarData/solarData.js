import {solarDataSelector} from '../sourceData/sourceDataSlice';
import {useSelector} from 'react-redux';

export const useOvenData = (solarId) => {
    console.assert(typeof solarId === "number");
    let solarData = useSelector(solarDataSelector(solarId));
    return solarData;
};
