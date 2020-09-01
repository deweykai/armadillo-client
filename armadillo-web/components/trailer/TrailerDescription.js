import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../common/styles';
import {useTrailer} from '../../common/trailer';

const TrailerDescription = (tid) => {
    const classes = useStyles();
    const trailer = useTrailer(tid);

    if (trailer === null) return <div>No Data</div>;

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
