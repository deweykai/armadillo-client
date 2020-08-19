import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TrailerIcon from '@material-ui/icons/LocalShippingTwoTone';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import GetApp from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import {useTrailer} from '../features/trailer/trailer';
import {NavLink, useRouteMatch} from 'react-router-dom';
import HomeButton from '../components/HomeButton';

const ListItemLink = (props) => (
    <ListItem button exact component={NavLink} activeClassName='Mui-selected' {...props} />
);

const nodeListItem = (url, type) => (id, idx) => {
    return (
        <ListItemLink to={`${url}/${type}/${id}`} key={`${type}-${id}`}>
            <ListItemIcon>
                <BikeIcon />
            </ListItemIcon>
            <ListItemText primary={`${type} ${idx + 1}`} />
        </ListItemLink>
    );
};

const BikeListLink = ({url}) => (
    <ListItemLink to={`${url}/bike`} key={`bike-list`}>
        <ListItemIcon>
            <BikeIcon />
        </ListItemIcon>
        <ListItemText primary={'Bikes'} />
    </ListItemLink>
);

const DownloaderLink = ({url}) => (
    <ListItemLink to={`${url}/download`} key={`bike-list`}>
        <ListItemIcon>
            <GetApp />
        </ListItemIcon>
        <ListItemText primary={'Downloader'} />
    </ListItemLink>
);
            

const createDrawer = (url, trailer) => {
    const ovens = trailer.ovens.map(nodeListItem(url, 'oven'));
    const solars= trailer.solars.map(nodeListItem(url, 'solar'));

    return (
        <List>
            <ListItemLink to={`${url}/trailer`} key={'trailer'}>
                <ListItemIcon>
                    <TrailerIcon />
                </ListItemIcon>
                <ListItemText primary={trailer.name} />
            </ListItemLink>

            <Divider />
            <BikeListLink url={url} />
            <Divider />
            {ovens}
            <Divider />
            {solars}
            <Divider />
            <DownloaderLink url={url} />
        </List>
    );
};


const Sidebar = () => {
    const match = useRouteMatch();
    const classes = useStyles();

    const trailer = useTrailer();

    // if (org.status === 'loading') return "loading";
    // if (org.status === 'failed') return "failed to load dashboard";
    // if (org.status === 'idle') return "there is an issue";

    let drawer;
    if (trailer !== null) {
        drawer = createDrawer(match.url, trailer);
    } else {
        drawer = "";
    }

    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant='permanent'
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}>
                    <HomeButton />
                </div>
                {drawer}
            </Drawer>
        </div>
    );
};

export default Sidebar;
