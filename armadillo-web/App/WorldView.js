import React, {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';

const renderTrailer = (trailer) => {
    return (
        <ListItem button component={Link} to={`/${trailer.id}`} key={trailer.id}>
            <ListItemText primary={trailer.name} />
        </ListItem>
    );
};

const useTrailerList = () => {
    const [trailerList, setTrailerList] = useState(null);

    useEffect(() => {
        fetch('/api/trailer')
            .then((res) => res.json())
            .then((trailerList) => setTrailerList(trailerList))
            .catch(setTrailerList(null));
    }, []);

    return trailerList;
};

const WorldView = () => {
    let trailerList = useTrailerList();

    if (trailerList == null) {
        return 'failed to connect to database';
    }

    const trailers = trailerList.map(renderTrailer);

    return <List>{trailers}</List>;
};

export default WorldView;
