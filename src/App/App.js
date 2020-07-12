import React from 'react';
import './App.css';
import ArmadilloAppBar from './AppBar';
import Sidebar from './Sidebar';
import useStyles from './styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

const App = () => {
    const classes = useStyles();

    return (
        <Router>
	        <div className={classes.root}>
            <CssBaseline />
            <ArmadilloAppBar />
	          <Sidebar />
            <main className={classes.content}>
              <div className={classes.toolbar}></div>
              <Switch>
                <Route path='/org/'>
                  Org
                </Route>
                <Route path='/trailer/'>
                  Org
                </Route>
                <Route path='/bike/'>
                  Org
                </Route>
              </Switch>
            </main>
	        </div>
        </Router>
    );
};

export default App;
