import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrgData, unsetData} from './features/orgData/orgDataSlice';
import {pushData, setData} from './features/sourceData/sourceDataSlice';
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

const flatOrg = orgData => orgData.trailers.flatMap(trailer => [
    trailer.bikes.map(bike => `bike/${bike.id}`),
    trailer.ovens.map(oven => `oven/${oven.id}`),
    trailer.microgrids.map(microgrid => `microgrid/${microgrid.id}`),
]).flat();

const fetchData = async(id, count) => {
    const res = await getSourceData(id, count);
    if (!res.ok) {
        console.error(res.statusText);
        return;
    }

    return res.data;
};

const ContentView = () => {
    const {org_id} = useParams();
    const dispatch = useDispatch();
    const orgData = useSelector((state) => state.orgData.data);

    // dispatch org data request
    useEffect(() => {
        dispatch(fetchOrgData(org_id));

        return () => {
            dispatch(unsetData());
        };
    }, [org_id, dispatch]);

    useEffect(() => {
    // can't do anything if there is no data.
        if (orgData === null) return;


        // fetch initial data for bikes
        const initialCount = 100;
        flatOrg(orgData).forEach(sourceId => 
            fetchData(sourceId, initialCount).then(data => dispatch(setData({ id: sourceId, data })))
        );
    }, [org_id, orgData, dispatch]);

    return (
        <Switch>
            <Route exact path={`/${org_id}`}>
                <Redirect to={`/${org_id}/org`} />
            </Route>
            <Route path={`/${org_id}/org`}>
        Org
            </Route>
            <Route path={`/${org_id}/trailer/:trailer_id`}>
                <TrailerDashboard />
            </Route>
            <Route path={`/${org_id}/bike/:bike_id`}>
                <BikeDashboard />
            </Route>
            <Route path={`/${org_id}/oven/:oven_id`}>
                <OvenDashboard />
            </Route>
            <Route path={`/${org_id}/microgrid/:microgrid_id`}>
                <MicrogridDashboard />
            </Route>
        </Switch>
    );
};

export default ContentView;
