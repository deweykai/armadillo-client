import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOrgData, unsetData } from '../features/orgData/orgDataSlice';
import BikeDashboard from './BikeDashboard';
import {
    Switch, 
    Route,
    Redirect,
    useParams,
} from 'react-router-dom';

const ContentView = () => {
    const { org_id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrgData(org_id))

        return () => {
            dispatch(unsetData());
        };
    }, [org_id, dispatch]);

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