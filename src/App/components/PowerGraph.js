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
} from 'react-vis';
import AutoSizer from 'react-virtualized-auto-sizer';
import useStyles from '../styles';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';


const PowerGraph = ({data}) => {
    const classes = useStyles();
    const theme = useTheme();

    const [value, setValue] = useState(false);

    const onNearestX = (value, info)=> {
        setValue(value);
    };

    const onMouseLeave = () => {
        setValue(false);
    };

    return (
        <Paper className={classes.graphPaper}>
            <Typography variant="h5">Power</Typography>
            <AutoSizer disableHeight>
                {({width}) => (
                    <XYPlot onMouseLeave={onMouseLeave} height={250} width={width} yDomain={[0, 1500]} xType="time">
                        <XAxis />
                        <YAxis />
                        <VerticalGridLines />
                        <HorizontalGridLines />

                        <AreaSeries
                            data={data}
                            curve={'curveMonotoneX'}
                            color={theme.palette.secondary.light}
                            opacity={0.6}
                        />
                        <LineSeries
                            data={data}
                            curve={'curveMonotoneX'}
                            color={theme.palette.secondary.main}
                            onNearestX={onNearestX}
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
