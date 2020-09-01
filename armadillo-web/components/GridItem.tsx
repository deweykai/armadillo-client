import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from '../common/styles';

const GridItem = ({component, title}: {component: any, title: string}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.graphPaper}>
            <Typography variant="h5">{title}</Typography>
            {component}
        </Paper>
    );
};

export default GridItem;