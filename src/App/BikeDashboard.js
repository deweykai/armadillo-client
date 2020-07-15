import React from 'react';
import { useParams } from 'react-router-dom';

const BikeDashboard = () => {
    let { bike_id } = useParams();

    return `Bike ${bike_id} Dashboard`;
};

export default BikeDashboard;
