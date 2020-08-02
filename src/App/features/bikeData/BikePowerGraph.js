import React, {useState, useEffect} from 'react';
import PowerGraph from '../../components/PowerGraph';
import {bikeDataSelector} from './bikeDataSlice';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const BikePowerGraph = ({bike_id}) => {
    // assume that the data is valid since this component should only render when the data is present.
    const bikeData = useSelector(bikeDataSelector(bike_id));

    const [data, setData] = useState([]);

    // only recalculate when new data is avaliable.
    useEffect(() => {
        setData(bikeData.map((bike) => ({
            x: bike.created_at.secs_since_epoch * 1000, // time
            y: bike.current * bike.voltage, // power
        })));
    }, [bikeData]);

    return (
        <PowerGraph data={data} />
    );
};

BikePowerGraph.propTypes = {
    bike_id: PropTypes.number,
};

export default BikePowerGraph;
