import {configureStore} from '@reduxjs/toolkit';
import sourceDataReducer from '../features/sourceData/sourceDataSlice';
import trailerReducer from '../features/trailer/trailerSlice';

export default configureStore({
    reducer: {
        trailer: trailerReducer,
        sourceData: sourceDataReducer,
    },
});
