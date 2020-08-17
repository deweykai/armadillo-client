import {ovenDataSelector} from '../sourceData/sourceDataSlice';
import {useSelector} from 'react-redux';

export const useOvenData = (ovenId) => {
    console.assert(typeof ovenId === "number");
    let ovenData = useSelector(ovenDataSelector(ovenId));
    return ovenData;
};
