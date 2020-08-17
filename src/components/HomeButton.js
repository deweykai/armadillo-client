import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        ...theme.mixins.toolbar,
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
    },
    homeButton: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
}));

const HomeButton = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ButtonBase className={classes.homeButton} component={NavLink} to='/'>
                <Typography variant="h5">World</Typography>
            </ButtonBase>
        </div>
    );
};

export default HomeButton;
