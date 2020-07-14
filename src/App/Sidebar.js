import React, { useState, useEffect }from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TrailerIcon from '@material-ui/icons/LocalShippingTwoTone';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import OrgIcon from '@material-ui/icons/Business';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';

const exampleOrgStructure = {
    id: 1,
    name: "Kai's Inc.",
    trailers: [
        {
            location: "Kai's House",
            id: 1,
            bikes: [
                {
                    id: 1,
                },
                {
                    id: 2,
                },
            ],
        },
        {
            location: "Garage",
            id: 2,
            bikes: [
                {
                    id: 3,
                },
            ],
        },
    ],
};

const ListItemLink = (props) => (
    <ListItem button exact component={NavLink} activeClassName='Mui-selected' {...props} />
);

const orgListItem = match => org => {
    if (org == null) {
        return (
            <List>
              <ListItem>Org data not found</ListItem>
            </List>
        );
    }
    const trailers = org.trailers.map(trailerListItem(match));
    return (
        <div>
          <List>
            <Divider />
            <ListItemLink to={`${match.url}/org/`}>
              <ListItemIcon>
                <OrgIcon />
              </ListItemIcon>
              <ListItemText primary={org.name}/>
            </ListItemLink>
            {trailers}
          </List>
        </div>
    );
};

const trailerListItem = match => trailer => {
    const bikes = trailer.bikes.map(bikeListItem(match));
    return (
        <div>
          <Divider />
          <ListItemLink to={`${match.url}/trailer/${trailer.id}`}>
            <ListItemIcon>
              <TrailerIcon />
            </ListItemIcon>
            <ListItemText primary={trailer.location} />
          </ListItemLink>
          {bikes}
        </div>
    );
};

const bikeListItem = match => (bike, idx) => {
    return (
        <ListItemLink to={`${match.url}/bike/${bike.id}`}>
          <ListItemIcon>
            <BikeIcon />
          </ListItemIcon>
          <ListItemText primary={`Bike ${idx + 1}`}/>
        </ListItemLink>
    );
};


const Sidebar = () => {
    const match = useRouteMatch();
    const classes = useStyles();
    const [structure, setStructure] = useState(null);

    const { org_id } = useParams();
    useEffect(() => {
        fetch(`/api/org/${org_id}`)
            .then(data => data.json())
            .then(structure => setStructure(structure))
            .catch(err => setStructure(null));
    }, [org_id]);

    const drawer = orgListItem(match)(structure);

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
              <Button
                to='/'
                color='secondary'
                component={NavLink}
                activeClassName='Mui-disabled'
                variant='contained'
                disableElevation
              >
                World
              </Button>
            </div>
            {drawer}
          </Drawer>
        </div>
    );
};

export default Sidebar;
