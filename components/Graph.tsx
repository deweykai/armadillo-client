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
import Error from './error';

type DisplayData = {
    x: string,
    y: number,
}

const Graph = ({data, missingMsg} : {data: GraphData[] | null, missingMsg: string}) => {
    const theme = useTheme();

    const [value, setValue] = useState<DisplayData | null>(null);

    const onNearestX = (value: GraphData)=> {
        setValue({
            y: value.y,
            x: new Date(value.x * 1000).toLocaleTimeString(),
        });
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
                {({width}: {width: number}) => (
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
        graph = <Error msg={missingMsg} />;
    }

    return (
        graph
    );
};

export default Graph;