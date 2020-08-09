import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTrailerData, removeData} from './features/trailer/trailerSlice';
import {pushData} from './features/sourceData/sourceDataSlice';
import BikeDashboard from './BikeDashboard';
import TrailerDashboard from './TrailerDashboard';
import OvenDashboard from './OvenDashboard';
import MicrogridDashboard from './MicrogridDashboard';
import {
    Switch,
    Route,
    Redirect,
    useParams,
} from 'react-router-dom';
import {getSourceData} from './api';
import * as rxjs from 'rxjs';
import {mergeMap} from 'rxjs/operators';

const getDataIds = trailer => ([
    trailer.bikes.map(bike => `bike/${bike}`),
    trailer.ovens.map(oven => `oven/${oven}`),
    trailer.microgrids.map(microgrid => `microgrid/${microgrid}`),
]).flat();

const fetchData = count => sourceId => new rxjs.Observable(subscriber => {
    getSourceData(sourceId, count)
        .then(res => {
            if (res.ok) {
                subscriber.next([sourceId, res.data]);
            } else {
                console.error(res.statusText);
            }
            subscriber.complete();
        });
});

const ContentView = () => {
    const {trailer_id} = useParams();
    const dispatch = useDispatch();
    const trailer = useSelector((state) => state.trailer.data);

    // dispatch org data request
    useEffect(() => {
        dispatch(fetchTrailerData(trailer_id));

        return () => {
            dispatch(removeData());
        };
    }, [trailer_id, dispatch]);

    useEffect(() => {
    // can't do anything if there is no data.
        if (trailer === null) return;

        // fetch initial data for bikes
        const sourceIdList = rxjs.from(getDataIds(trailer));

        const initialCount = 100;
        const initialSourceData = sourceIdList
            .pipe(mergeMap(fetchData(initialCount)));

        initialSourceData.subscribe(console.log);
        initialSourceData.subscribe(res => dispatch(pushData({id: res[0], packet: res[1]})));
    }, [trailer_id, trailer, dispatch]);

    return (
        <Switch>
            <Route exact path={`/${trailer_id}`}>
                <Redirect to={`/${trailer_id}/trailer`} />
            </Route>
            <Route path={`/${trailer_id}/trailer`}>
                <TrailerDashboard />
            </Route>
            <Route path={`/${trailer_id}/bike/:bike_id`}>
                <BikeDashboard />
            </Route>
            <Route path={`/${trailer_id}/oven/:oven_id`}>
                <OvenDashboard />
            </Route>
            <Route path={`/${trailer_id}/microgrid/:microgrid_id`}>
                <MicrogridDashboard />
            </Route>
        </Switch>
    );
};

export default ContentView;
