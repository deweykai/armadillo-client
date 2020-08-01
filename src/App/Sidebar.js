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
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';

const ListItemLink = (props) => (
  <ListItem button exact component={NavLink} activeClassName='Mui-selected' {...props} />
);

const orgListItem = match => org => {
  if (org == null) {
    return (
      <List>
        <ListItem key="missing">No Org Data</ListItem>
      </List>
    );
  }
  const trailers = org.trailers.map(trailerListItem(match));
  return (
    <div>
      <List>
        <Divider />
        <ListItemLink to={`${match.url}/org/`} key={`org-${org.name}`}>
          <ListItemIcon>
            <OrgIcon />
          </ListItemIcon>
          <ListItemText primary={org.name} />
        </ListItemLink>
        {trailers}
      </List>
    </div>
  );
};

const trailerListItem = match => trailer => {
  const bikes = trailer.bikes.map(nodeListItem(match, 'bike'));
  const ovens = trailer.ovens.map(nodeListItem(match, 'oven'));
  const microgrids = trailer.microgrids.map(nodeListItem(match, 'microgrid'));

  return (
    <div>
      <Divider />
      <ListItemLink to={`${match.url}/trailer/${trailer.id}`} key={`trailer-${trailer.id}`}>
        <ListItemIcon>
          <TrailerIcon />
        </ListItemIcon>
        <ListItemText primary={trailer.location} />
      </ListItemLink>
      {bikes}
      {ovens}
      {microgrids}
    </div>
  );
};

const nodeListItem = (match, type) => (item, idx) => {
  return (
    <ListItemLink to={`${match.url}/${type}/${item.id}`} key={`${type}-${item.id}`}>
      <ListItemIcon>
        <BikeIcon />
      </ListItemIcon>
      <ListItemText primary={`${type} ${idx + 1}`} />
    </ListItemLink>
  );
};


const Sidebar = () => {
  const match = useRouteMatch();
  const classes = useStyles();

  const org = useSelector(state => state.orgData);

  //if (org.status === 'loading') return "loading";
  //if (org.status === 'failed') return "failed to load dashboard";
  //if (org.status === 'idle') return "there is an issue";

  const structure = org.data;

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
            exact
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
