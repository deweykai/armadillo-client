import '../styles/globals.css'

import '../node_modules/react-vis/dist/style.css';

import {Provider} from 'react-redux';
import {store} from '../common//store';

//import 'fontsource-roboto';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

ReactDOM.render(
    <React.StrictMode>
    </React.StrictMode>,
    document.getElementById('root'),
);


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </MuiPickersUtilsProvider>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
