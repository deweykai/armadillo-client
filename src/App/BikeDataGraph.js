import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
import useStyles from './styles';


const BikeDataGraph = ({ bikeData }) => {
    const classes = useStyles();

    const data = bikeData.map((bike, idx) => ({
        x: bike.created_at,
        y: bike.current * bike.voltage,
    }));

    return (
        <Paper className={classes.graphPaper}>
          <Typography variant="h5">Power</Typography>
          <AutoSizer disableHeight>
            {({ width }) => (
                <XYPlot height={250} width={width} yDomain={[0, 1600]} xType="time">
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
