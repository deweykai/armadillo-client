import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    XYPlot,
    XAxis,
    YAxis,
    Crosshair,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
} from 'react-vis';
import AutoSizer from 'react-virtualized-auto-sizer';


const BikeDataGraph = ({ bikeData }) => {
    const data = bikeData.map((bike, idx) => ({
        x: bike.created_at,
        y: bike.current,
    }));

    return (
        <Paper>
          <AutoSizer disableHeight>
            {({ width }) => (
                <XYPlot height={300} width={width} yDomain={[0, 50]} xType="time">
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis />
                  <YAxis />

                  <LineSeries data={data} />
                </XYPlot>
            )}
          </AutoSizer>
        </Paper>
    );
};

export default BikeDataGraph;
