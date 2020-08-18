import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';
import '../node_modules/react-vis/dist/style.css';

import {Provider} from 'react-redux';
import {store} from './App/store';

import {App} from './App/App';
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
