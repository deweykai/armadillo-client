import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import useStyles from '../../styles';

const TrailerDescription = ({ trailer_id }) => {
    const classes = useStyles();
    const orgData = useSelector(state => state.orgData.data);

    if (orgData === null) return "No data";

    const trailer = orgData.trailers.find(trailer => trailer.id === Number(trailer_id));

    return (
        <Paper className={classes.graphPaper}>
            <Typography>
                Trailer: {trailer_id}
            </Typography>
            <Typography>
                Name: {trailer.name}
            </Typography>
            <Typography>
                Location: {trailer.location}
            </Typography>
        </Paper>
    )
};

export default TrailerDescription;