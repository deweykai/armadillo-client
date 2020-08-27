import React, { useState } from 'react';
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
import { useTheme } from '@material-ui/core/styles';
import type {GraphData} from '../common/graphData';
import GridItem from './GridItem';

const Graph = ({data, title, missingMsg} : {data: GraphData[] | null, title: string, missingMsg: string}) => {
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

    let graph;

    if (data !== null) {
        graph = (
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
        );
    } else {
        graph = missingMsg;
    }

    return (
        <GridItem title={title} component={graph} />
    );
};

export default Graph;