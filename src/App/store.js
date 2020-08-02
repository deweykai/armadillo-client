import {configureStore} from '@reduxjs/toolkit';
import orgDataReducer from './features/orgData/orgDataSlice';
import sourceDataReducer from './features/sourceData/sourceDataSlice';

export default configureStore({
    reducer: {
        orgData: orgDataReducer,
        sourceData: sourceDataReducer,
    },
});
