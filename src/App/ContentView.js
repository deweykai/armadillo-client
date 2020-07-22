import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrgData, unsetData } from '../features/orgData/orgDataSlice';
import { pushData, fetchBikeData } from '../features/bikeData/bikeDataSlice';
import BikeDashboard from './BikeDashboard';
import { getBikeUpdateSocket } from './api';
import {
    Switch, 
    Route,
    Redirect,
    useParams,
} from 'react-router-dom';

const ContentView = () => {
    const { org_id } = useParams();
    const dispatch = useDispatch();
    const orgData = useSelector(state => state.orgData.data);

    // dispatch org data request
    useEffect(() => {
        dispatch(fetchOrgData(org_id))

        return () => {
            dispatch(unsetData());
        };
    }, [org_id, dispatch]);

    useEffect(() => {
        // can't do anything if there is no data.
        if (orgData === null) return;

        // fetch initial data for bikes
        orgData.trailers.map(trailer => trailer.bikes.map(bike => {
            dispatch(fetchBikeData(bike.id));
        }));

        // map through all bikes
        const sockets = orgData.trailers.map(trailer => trailer.bikes.map(bike => {
            let socket = getBikeUpdateSocket(bike.id);
            socket.onmessage = event => {
                dispatch(pushData({ packet: JSON.parse(event.data) }));
            }
            return socket;
        })).flat();

        // close sockets afterwards
        return () => {
            sockets.map(socket => socket.close());
        };
    }, [org_id, orgData]);

    return (
        <Switch>
          <Route exact path={`/${org_id}`}>
            <Redirect to={`/${org_id}/org`}/>
          </Route>
          <Route path={`/${org_id}/org`}>
            Org
          </Route>
          <Route path={`/${org_id}/trailer/:id`}>
            Trailer
          </Route>
          <Route path={`/${org_id}/bike/:bike_id`}>
            <BikeDashboard />
          </Route>
        </Switch>
    );
};

export default ContentView;