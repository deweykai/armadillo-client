import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/ToolBar';
import useStyles from './styles';

const ArmadilloAppBar = () => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography varient="h5" noWrap>
            Armadillo
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ArmadilloAppBar;
