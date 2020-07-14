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
    Redirect,
    useParams,
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
                  <ContentView />
                </main>
              </Route>
            </Switch>
	        </div>
        </Router>
    );
};

const ContentView = () => {
    const { org_id } = useParams();

    return (
        <Switch>
          <Route exact path={`/${org_id}`}>
            <Redirect to={`/${org_id}/org`}/>
          </Route>
          <Route path={`/${org_id}/org`}>
            Org
          </Route>
          <Route path={`/${org_id}/trailer/:id`}>
            Trailer
          </Route>
          <Route path={`/${org_id}/bike/:id`}>
            Bike
          </Route>
        </Switch>
    );
};

export default App;
