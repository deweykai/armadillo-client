import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {ovenDataSelector} from '../sourceData/sourceDataSlice';

export const useOvenTemperatureGraphData = (oven_id) => {
    const data = useSelector(ovenDataSelector(oven_id));

    const [temp, setTemp] = useState([]);

    useEffect(() => {
        setTemp(data.map((entry) => ({
            x: entry.created_at.secs_since_epoch * 1000,
            y: entry.temperature,
        })));
    }, [data]);

    return temp;
};
