import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

export const bikeDataSlice = createSlice({
    name: 'bikeData',
    initialState,
    reducers: {
        addBikeData: (state, action) => {
            const { id, data } = action.payload;
            state[id] = {
                ...state[id],
                data,
            };
        },
        loading: (state, action) => {
            const { id } = action.payload;

            state[id] = {
                ...state[id],
                status: 'loading',
            };
        },
        success: (state, action) => {
            const { id } = action.payload;

            state[id] = {
                ...state[id],
                status: 'success',
            };
        },
        failed: (state, action) => {
            const { id } = action.payload;

            state[id] = {
                ...state[id],
                status: 'failed',
            };
        },
    }
});

export const { addBikeData, loading, success, failed } = bikeDataSlice.actions;

export const fetchBikeData = id => (dispatch, getState) => {
    const { bikeData } = getState();
    if (bikeData[id] && bikeData[id].state === 'loading') return;

    dispatch(loading({ id }));
    fetch(`/api/data/bike/${id}`)
        .then(res => res.json())
        .then(data => {
            dispatch(addBikeData({ id, data }));
            dispatch(success({ id }));
        })
        .catch(err => {
            console.error(err);
            dispatch(failed({ id }))
        });
}

export const bikeDataSelector = id => state => (state.bikeData[id]);

export default bikeDataSlice.reducer;