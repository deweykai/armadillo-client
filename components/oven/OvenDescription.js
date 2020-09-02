import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../common/styles';
import PropTypes from 'prop-types';

const OvenDescription = ({oven_id}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.graphPaper}>
            <Typography>
                Oven: {oven_id}
            </Typography>
        </Paper>
    );
};

OvenDescription.propTypes = {
    oven_id: PropTypes.number,
};

export default OvenDescription;
