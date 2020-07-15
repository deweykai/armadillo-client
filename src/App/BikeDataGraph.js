import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    FlexibleWidthXYPlot as XYPlot,
    XAxis,
    YAxis,
    Crosshair,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
} from 'react-vis';


const BikeDataGraph = ({ bikeData }) => {
    const data = bikeData.map((bike, idx) => ({
        x: bike.created_at * 1000,
        y: bike.current,
    }));

    return (
        <Paper>
          <XYPlot height={300} yDomain={[0, 50]} xType="time">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />

            <LineSeries data={data} />
          </XYPlot>
        </Paper>
    );
};

export default BikeDataGraph;
