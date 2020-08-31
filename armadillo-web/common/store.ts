import {configureStore} from '@reduxjs/toolkit';
import sourceDataReducer, {pushData} from '../features/sourceData/sourceDataSlice';
import trailerReducer from '../features/trailer/trailerSlice';

const actionSanitizer = (action: any) => (
    action.type ===  pushData.type && action.payload.packet ? {
        ...action,
        payload: {
            id: action.payload.id,
            length: action.payload.packet.length,
            packet: '<<LONG_BLOB>>',
        }
    }: action
);

const devTools = {
    actionSanitizer,
    stateSanitizer: (state: any) => state.sourceData ? { ...state, sourceData: '<<LONG_BLOB>>' } : state
};

export const store = configureStore({
    reducer: {
        trailer: trailerReducer,
        sourceData: sourceDataReducer,
    },
    devTools,
});

export type AppDispatch = typeof store.dispatch;
