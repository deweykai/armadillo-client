import React, { useState, useEffect } from 'react';

const exampleOrgList = [
    {
        "id":1,
        "name":"Kai"
    },
    {
        "id":2,
        "name":"energilab"
    }
];

const renderOrg = org => {
    return JSON.stringify(org);
};

const WorldView = () => {
    let [orgList, setOrgList] = useState(null);

    useEffect(() => {
        setOrgList(exampleOrgList);
    }, []);

    if (orgList == null) {
        return "failed to connect to database";
    }

    const orgs = orgList.map(renderOrg);

    return orgs;
};

export default WorldView;
