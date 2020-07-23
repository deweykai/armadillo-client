import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const renderOrg = org => {
    return (
        <ListItem button component={Link} to={`/${org.id}`}>
            <ListItemText primary={org.name} />
        </ListItem>
    );
};

const WorldView = () => {
    let [orgList, setOrgList] = useState(null);

    useEffect(() => {
        fetch('/api/org/')
            .then(res => res.json())
            .then(orgList => setOrgList(orgList))
            .catch(setOrgList(null));
    }, []);

    if (orgList == null) {
        return "failed to connect to database";
    }

    const orgs = orgList.map(renderOrg);

    return <List>{orgs}</List>;
};

export default WorldView;
