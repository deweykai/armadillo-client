import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connectBike } from './bikeDataSlice';

const BikeDataSocket = ({ bike_id }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = dispatch( connectBike(bike_id) );
        if (socket === null) return;

        return () => socket.close();
    }, [dispatch, bike_id]);
  
    return null;
}

export default BikeDataSocket;