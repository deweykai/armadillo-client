import {createSlice} from '@reduxjs/toolkit';
import {getTrailerData} from '../../common/api';
import type {AppDispatch} from '../../App/store';

interface TrailerData {
    name: string,
    location: string,
    bikes: Array<number>,
    ovens: Array<number>,
    solars: Array<number>,
};

export type {TrailerData};

enum Status {
    Idle = 'idle',
    Loading = 'loading',
    Failed = 'failed',
    Success = 'success',
};

interface TrailerState {
    status: Status,
    data: TrailerData,
}

const initialTrailerData = {
    name: "",
    location: "",
    ovens: [],
    bikes: [],
    solars: [],
};

const initialState = {
    status: Status.Idle,
    data: initialTrailerData
};

export const trailerSlice = createSlice({
    name: 'trailer',
    initialState,
    reducers: {
        addData: (state: TrailerState, action) => {
            let data = action.payload.data;
            state.data = data;
        },
        removeData: (state: TrailerState) => {
            state.data = initialTrailerData;
            state.status = Status.Loading;
        },
        loading: (state: TrailerState) => {
            state.status = Status.Loading;
        },
        failed: (state: TrailerState) => {
            state.status = Status.Failed;
        },
        success: (state: TrailerState) => {
            state.status = Status.Success;
        },
    },
});

export const {addData, removeData, loading, failed, success} = trailerSlice.actions;

export const fetchTrailerData = (id: number) => async (dispatch: AppDispatch, getState: any) => {
    const {status} = getState();
    if (status === 'loading') return;

    dispatch(loading());

    const res = await getTrailerData(id);
    if (!res.ok) {
        console.error(res.statusText);
        dispatch(failed());
        return;
    }

    const data = res.data;

    dispatch(addData({data}));
    dispatch(success());
};

export default trailerSlice.reducer;
