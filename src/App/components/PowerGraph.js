import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    AreaSeries,
    LineSeries,
} from 'react-vis';
import AutoSizer from 'react-virtualized-auto-sizer';
import useStyles from '../styles';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';

const PowerGraph = ({data}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Paper className={classes.graphPaper}>
            <Typography variant="h5">Power</Typography>
            <AutoSizer disableHeight>
                {({width}) => (
                    <XYPlot height={250} width={width} yDomain={[0, 1500]} xType="time">
                        <XAxis />
                        <YAxis />
                        <AreaSeries data={data} color={theme.palette.secondary.light} />
                        <LineSeries data={data} color={theme.palette.secondary.main} />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                    </XYPlot>
                )}
            </AutoSizer>
        </Paper>
    );
};

PowerGraph.propTypes = {
    data: PropTypes.array,
};

export default PowerGraph;
