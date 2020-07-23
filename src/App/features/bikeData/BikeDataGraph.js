import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
} from 'react-vis';
import AutoSizer from 'react-virtualized-auto-sizer';
import useStyles from '../../styles';
import { bikeDataSelector } from './bikeDataSlice';
import { useSelector } from 'react-redux';


const BikeDataGraph = ({ bike_id }) => {
  const classes = useStyles();
  // assume that the data is valid since this component should only render when the data is present.
  const bikeData = useSelector(bikeDataSelector(bike_id)).data;

  const [data, setData] = useState([]);

  // only recalculate when new data is avaliable. 
  useEffect(() => {
    setData(bikeData.map((bike, idx) => ({
      x: bike.created_at.secs_since_epoch * 1000,
      y: bike.current * bike.voltage,
    })));
  }, [bikeData]);

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
