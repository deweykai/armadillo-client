import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {useTrailer} from '../features/trailer/trailer';
import Link from 'next/link';
import useStyle from '../common/styles';

const Navbar = () => {
    const classes = useStyle();
    const trailer = useTrailer();
    
    const title = trailer ? trailer.name : 'Armadillo';

    return (
        <nav>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography varient="h5" noWrap>
                    {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </nav> 
    );
};

export default Navbar;
