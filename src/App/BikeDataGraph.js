import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    FlexibleWidthXYPlot as XYPlot,
    LineSeries,
} from 'react-vis';


const BikeDataGraph = ({ bikeData }) => {
    const data = bikeData.map((bike, idx) => ({
        x: bike.created_at,
        y: bike.current,
    }));

    return (
        <Paper>
          <XYPlot height={300} xType="time">
            <LineSeries data={data} />
          </XYPlot>
        </Paper>
    );
};

export default BikeDataGraph;
