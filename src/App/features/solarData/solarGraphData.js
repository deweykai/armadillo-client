import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {microgridDataSelector} from '../sourceData/sourceDataSlice';

export const useSolarPowerGraphData = (solarId) => {
    const data = useSelector(microgridDataSelector(solarId));
    const [power, setPower] = useState([]);

    useEffect(() => {
        setPower(data.map((entry) => ({
            x: entry.created_at.secs_since_epoch * 1000,
            y: entry.power,
        })));
    }, [data]);

    return power;
}
