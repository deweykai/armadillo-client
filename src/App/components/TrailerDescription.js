import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles';
import {useTrailer} from '../features/trailer/trailer';

const TrailerDescription = () => {
    const classes = useStyles();
    let trailer = useTrailer();

    if (trailer === null) return 'No data';

    return (
        <Paper className={classes.graphPaper}>
            <Typography>
                Name: {trailer.name}
            </Typography>
            <Typography>
                Location: {trailer.location}
            </Typography>
        </Paper>
    );
};

export default TrailerDescription;
