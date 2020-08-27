import React, { useState } from 'react';
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
    Hint,
    Highlight,
} from 'react-vis';
import AutoSizer from 'react-virtualized-auto-sizer';
import useStyles from '../App/styles';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import type {GraphData} from '../common/graphData';

const PowerGraph = ({data, title} : {data: GraphData[], title: string}) => {
    const classes = useStyles();
    const theme = useTheme();

    const [value, setValue] = useState<GraphData | null>(null);

    const onNearestX = (value: GraphData)=> {
        setValue(value);
    };

    const onMouseLeave = () => {
        setValue(null);
    };

    const getX = (d: GraphData) => {
        return d.x * 1000;
    };

    return (
        <Paper className={classes.graphPaper}>
            <Typography variant="h5">{title}</Typography>
            <AutoSizer disableHeight>
                {({width}) => (
                    <XYPlot getX={getX} onMouseLeave={onMouseLeave} height={250} width={width} xType="time">
                        <XAxis />
                        <YAxis />
                        <VerticalGridLines />
                        <HorizontalGridLines />

                        <AreaSeries
                            data={data}
                            color={theme.palette.secondary.light}
                            opacity={0.6}
                        />
                        <LineSeries
                            data={data}
                            color={theme.palette.secondary.main}
                            onNearestX={onNearestX}
                        />
                        <Highlight
                            drag
                            enableY={false}
                        />
                        {value ? <Hint value={value} /> : null}
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
