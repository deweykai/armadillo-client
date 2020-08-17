import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {solarDataSelector} from '../sourceData/sourceDataSlice';

export const useSolarPowerGraphData = (solarId) => {
    const data = useSelector(solarDataSelector(solarId));
    const [power, setPower] = useState([]);

    useEffect(() => {
        setPower(data.map((entry) => ({
            x: entry.created_at,
            y: entry.power,
        })));
    }, [data]);

    return power;
}
