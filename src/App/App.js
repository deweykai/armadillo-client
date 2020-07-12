import React from 'react';
import './App.css';
import ArmadilloAppBar from './AppBar';
import Sidebar from './Sidebar';
import useStyles from './styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
    const classes = useStyles();
    return (
	      <div className={classes.root}>
          <CssBaseline />
          <ArmadilloAppBar />
	        <Sidebar />
	      </div>
    );
};

export default App;
