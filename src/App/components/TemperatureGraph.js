import React from 'react';
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
import useStyles from '../styles';
import PropTypes from 'prop-types';

const TemperatureGraph = ({ data }) => {
    const classes = useStyles();

    if (data == null) {
        return (
            <Typography>No Data</Typography>
        );
    }

    return (
        <Paper className={classes.graphPaper}>
            <Typography variant="h5">Temperature</Typography>
            <AutoSizer disableHeight>
                {({width}) => (
                    <XYPlot height={250} width={width} yDomain={[0, 100]} xType="time">
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

TemperatureGraph.propTypes = {
    data: PropTypes.array,
};

export default TemperatureGraph;
