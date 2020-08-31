import React from 'react';
import BikePowerGraph from '../components/bike/BikePowerGraph';
import Grid from '@material-ui/core/Grid';
import {useTrailer} from '../features/trailer/trailer';

const BikeListDashboard = () => {
    const trailer = useTrailer();

    if (trailer === null) return "No Data";

    let bike_graphs = [];
    for (let i = 0; i < trailer.bikes.length; i++) {
        bike_graphs.push(
            <Grid item xs={12}>
                <BikePowerGraph bike_id={trailer.bikes[i]} />
            </Grid>
        );
    }

    return (
        <div>
            <Grid container spacing={3}>
                {bike_graphs}
            </Grid>
        </div>
    );
};

export default BikeListDashboard;
