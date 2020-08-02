import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrgData, unsetData} from './features/orgData/orgDataSlice';
import {pushData, setData} from './features/bikeData/bikeDataSlice';
import BikeDashboard from './BikeDashboard';
import TrailerDashboard from './TrailerDashboard';
import OvenDashboard from './OvenDashboard';
import MicrogridDashboard from './MicrogridDashboard';
import {getBikeUpdateSocket} from './api';
import {
    Switch,
    Route,
    Redirect,
    useParams,
} from 'react-router-dom';
import {getBikeData} from './api';

const fetchBikeData = async (id) => {
    const res = await getBikeData(id);
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
        orgData.trailers.map((trailer) => trailer.bikes.forEach((bike) => {
            fetchBikeData(bike.id).then((data) => dispatch(setData({id: bike.id, data})));
        }));
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
