import {configureStore} from '@reduxjs/toolkit';
import orgDataReducer from './features/orgData/orgDataSlice';
import bikeDataReducer from './features/bikeData/bikeDataSlice';

export default configureStore({
    reducer: {
        orgData: orgDataReducer,
        bikeData: bikeDataReducer,
    },
});
