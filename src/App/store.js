import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import orgDataReducer from './features/orgData/orgDataSlice';
import bikeDataReducer from './features/bikeData/bikeDataSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        orgData: orgDataReducer,
        bikeData: bikeDataReducer,
    },
});
