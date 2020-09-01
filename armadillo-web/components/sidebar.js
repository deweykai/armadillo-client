import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TrailerIcon from '@material-ui/icons/LocalShippingTwoTone';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import GetApp from '@material-ui/icons/GetApp';
import useStyles from '../common/styles';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import {useRouter} from 'next/router';

const ListLink = ({name, url, icon}) => (
    <ListItem button>
        <Link href={url}>
            <a>{name}</a>
        </Link>
        <ListItemIcon>
            <icon />
        </ListItemIcon>
    </ListItem>
)

const NavDrawer = ({tid}) => (
    <List>
        <ListLink name="Trailer" url={`/trailer/${tid}`} icon={TrailerIcon} />
        <Divider />
        <ListLink name="Bikes" url={`/trailer/${tid}/bike`} icon={BikeIcon} />
        <Divider />
        <ListLink name="Oven" url={`/trailer/${tid}/oven`} icon={BikeIcon} />
        <Divider />
        <ListLink name="Solar" url={`/trailer/${tid}/solar`} icon={BikeIcon} />
        <Divider />
        <ListLink name="Download" url={`/trailer/${tid}/download`} icon={GetApp} />
    </List>
);

const Sidebar = () => {
    const classes = useStyles();
    const router = useRouter();
    const tid = Number(router.query.tid);

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
                <div className={classes.offset} />
                <NavDrawer tid={tid} />
            </Drawer>
        </div>
    );
};

export default Sidebar;
