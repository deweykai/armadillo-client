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
    useRouteMatch,
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
                  This
                </main>
              </Route>
              <Route path='/:org_id'>
	              <Sidebar />
                <main className={classes.content}>
                  <div className={classes.toolbar}></div>
                  <OrgView />
                </main>
              </Route>
            </Switch>
	        </div>
        </Router>
    );
};

const OrgView = () => {
    const match = useRouteMatch();

    console.log(match);
    return (
        <Switch>
          <Route path={`${match.url}/org`}>
            Org
          </Route>
          <Route path={`${match.url}/trailer/:id`}>
            Trailer
          </Route>
          <Route path={`${match.url}/bike/:id`}>
            Bike
          </Route>
        </Switch>
    );
};

export default App;
