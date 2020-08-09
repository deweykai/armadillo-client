import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles';
import PropTypes from 'prop-types';

const MicrogridDescription = ({microgrid_id}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.graphPaper}>
            <Typography>
                Microgrid: {microgrid_id}
            </Typography>
        </Paper>
    );
};

MicrogridDescription.propTypes = {
    microgrid_id: PropTypes.number,
};

export default MicrogridDescription;
