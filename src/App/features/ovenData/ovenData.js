import {ovenDataSelector} from '../sourceData/sourceDataSlice';
import {useSelector} from 'react-redux';

export const useOvenData = (ovenId) => {
    let ovenData = useSelector(ovenDataSelector(ovenId));
    return ovenData;
};
