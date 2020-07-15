import React, { useState, useEffect } from 'react';
import BikeDataTable from './BikeDataTable.js';
import { useParams } from 'react-router-dom';


const BikeDashboard = () => {
    let { bike_id } = useParams();
    let [bikeData, setBikeData] = useState(null);

    useEffect(() => {
        setBikeData(null);
        fetch(`/api/data/bike/${bike_id}`)
            .then(res => res.json())
            .then(raw_data => raw_data.map(data => ({
                ...data,
                created_at: new Date(data.created_at.secs_since_epoch * 1000).toLocaleString(),
            })))
            .then(data => setBikeData(data));
    }, [bike_id]);

    if (bikeData == null) {
        return "Waiting for data";
    }

    return (
        <BikeDataTable bikeData={bikeData}/>
    );
};

export default BikeDashboard;
