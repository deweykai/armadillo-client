import {createSlice} from '@reduxjs/toolkit';
import {getTrailerData} from '../../common/api';

const initialTrailerData = {
    name: "",
    location: "",
    ovens: [],
    bikes: [],
    solars: [],
};


const initialState = {
    status: 'idle',
    data: initialTrailerData
};

export const trailerSlice = createSlice({
    name: 'trailer',
    initialState,
    reducers: {
        addData: (state, action) => {
            let data = action.payload.data;
            state.data = data;
        },
        removeData: (state) => {
            state.data = initialTrailerData;
            state.status = 'idle';
        },
        loading: (state) => {
            state.status = 'loading';
        },
        failed: (state) => {
            state.status = 'failed';
        },
        success: (state) => {
            state.status = 'success';
        },
    },
});

export const {addData, removeData, loading, failed, success} = trailerSlice.actions;

export const fetchTrailerData = (id) => async (dispatch, getState) => {
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
