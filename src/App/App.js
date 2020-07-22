import React from 'react';
import './App.css';
import ArmadilloAppBar from './AppBar';
import Sidebar from './Sidebar';
import useStyles from './styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import WorldView from './WorldView';
import ContentView from './ContentView';
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
            <Switch>
              <Route exact path='/'>
	              <Sidebar />
                <main className={classes.content}>
                  <div className={classes.toolbar}></div>
                  <WorldView />
                </main>
              </Route>
              <Route path='/:org_id'>
	              <Sidebar />
                <main className={classes.content}>
                  <div className={classes.toolbar}></div>
                  <ContentView />
                </main>
              </Route>
            </Switch>
	        </div>
        </Router>
    );
};

export default App;
