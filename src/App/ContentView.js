import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTrailerData, removeData} from '../features/trailer/trailerSlice';
import BikeListDashboard from './BikeListDashboard';
import TrailerDashboard from './TrailerDashboard';
import OvenDashboard from './OvenDashboard';
import SolarDashboard from './SolarDashboard';
import {
    Switch,
    Route,
    Redirect,
    useParams,
} from 'react-router-dom';
import DataDownloader from '../common/downloadData';
import Downloader from './Downloader';

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
            <Route path={`/${trailer_id}/bike`}>
                <BikeListDashboard />
            </Route>
            <Route path={`/${trailer_id}/oven/:oven_id`}>
                <OvenDashboard />
            </Route>
            <Route path={`/${trailer_id}/solar/:solar_id`}>
                <SolarDashboard />
            </Route>
            <Route path={`/${trailer_id}/download`}>
                <Downloader />
            </Route>
        </Switch>
    );
};

export default ContentView;
