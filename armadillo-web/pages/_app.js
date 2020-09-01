//import '../styles/globals.css'

import '../node_modules/react-vis/dist/style.css';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';


import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../common/theme';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ThemeProvider theme={theme} >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <Component {...pageProps} />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp
