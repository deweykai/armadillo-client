import {configureStore} from '@reduxjs/toolkit';
import sourceDataReducer from '../features/sourceData/sourceDataSlice';
import trailerReducer from '../features/trailer/trailerSlice';

export const store = configureStore({
    reducer: {
        trailer: trailerReducer,
        sourceData: sourceDataReducer,
    },
});
