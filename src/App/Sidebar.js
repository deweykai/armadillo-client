import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TrailerIcon from '@material-ui/icons/LocalShippingTwoTone';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import OrgIcon from '@material-ui/icons/Business';
import useStyles from './styles';

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

const orgListItem = (org) => {
    const trailers = org.trailers.map(trailerListItem);
    return (
        <div>
          <ListItem button>
            <ListItemIcon>
              <OrgIcon />
            </ListItemIcon>
            <ListItemText primary={org.name}/>
          </ListItem>
          {trailers}
        </div>
    );
};

const trailerListItem = (trailer) => {
    const bikes = trailer.bikes.map(bikeListItem);
    return (
        <div>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <TrailerIcon />
            </ListItemIcon>
            <ListItemText primary={trailer.location} />
          </ListItem>
          {bikes}
        </div>
    );
};

const bikeListItem = (bike, idx) => {
    return (
        <ListItem button>
          <ListItemIcon>
            <BikeIcon />
          </ListItemIcon>
          <ListItemText primary={`Bike ${idx + 1}`}/>
        </ListItem>
    );
};

const Sidebar = () => {
    const classes = useStyles();

	  const drawer = orgListItem(exampleOrgStructure);

    return (
		    <Drawer
          className={classes.drawer}
			    variant="permanent"
          classes={{
              paper: classes.drawerPaper,
          }}
			    anchor="left"
		    >
          <div className={classes.toolbar} />
          <Divider />
          {drawer}
		    </Drawer>
    );
};

export default Sidebar;
