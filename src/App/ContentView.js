import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTrailerData, removeData} from '../features/trailer/trailerSlice';
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
import DataDownloader from '../common/downloadData';

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
        DataDownloader.start(trailer, dispatch);

        return () => {
            DataDownloader.stop();
        };
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
