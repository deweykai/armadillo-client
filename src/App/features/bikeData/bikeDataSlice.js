import { createSlice } from '@reduxjs/toolkit';
import { getBikeData } from '../../api';

const initialBikeState = {
    status: 'disconnected',
    fetchStatus: 'fresh',
    data: [],
};

const getBikeState = (state, id) => {
    if (state[id] === undefined) {
        state[id] = { ...initialBikeState };
    }

    return state[id];
}

export const bikeDataSlice = createSlice({
    name: 'bikeData',
    initialState: {},
    reducers: {
        pushData: (state, action) => {
            const { id, packet } = action.payload;

            // put new data at front of array
            const bike = getBikeState(state, id);
            bike.data = [packet, ...bike.data];

            // if the data is longer than 100 entries, pop old data
            while (bike.data.length > 100) {
                bike.data.pop();
            }
        },
        setData: (state, action) => {
            const { id, data } = action.payload;

            getBikeState(state, id).data = data;
        },
        loading: (state, action) => {
            const { id } = action.payload;

            getBikeState(state, id).fetchStatus = 'loading';
        },
        success: (state, action) => {
            const { id } = action.payload;

            getBikeState(state, id).fetchStatus = 'success';
        },
        failed: (state, action) => {
            const { id } = action.payload;

            getBikeState(state, id).fetchStatus = 'failed';
        },
    }
});

export const { pushData, setData, loading, success, failed } = bikeDataSlice.actions;


export const fetchBikeData = id => async (dispatch, getState) => {
    const { bikeData } = getState();
    if (bikeData[id] && bikeData[id].fetchStatus === 'loading') return;

    dispatch(loading({ id }));

    const res = await getBikeData(id);
    if (!res.ok) {
        console.error(res.statusText);
        dispatch(failed({ id }));
        return;
    }


    dispatch(setData({ id, data: res.data }));
    dispatch(success({ id }));
};

export const bikeDataSelector = id => state => {
    let bikeData = state.bikeData[id];
    if (bikeData === undefined) {
        bikeData = { ...initialBikeState };
    }
    return bikeData;
};

export default bikeDataSlice.reducer;
