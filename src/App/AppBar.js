import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/ToolBar';
import useStyles from './styles';
import {useTrailer} from '../features/trailer/trailer';

const ArmadilloAppBar = () => {
    const classes = useStyles();
    const trailer = useTrailer();
    
    const title = trailer ? trailer.name : 'Armadillo';

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography varient="h5" noWrap>
                    {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ArmadilloAppBar;
