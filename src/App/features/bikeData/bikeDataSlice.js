import {createSlice} from '@reduxjs/toolkit';

export const bikeDataSlice = createSlice({
    name: 'bikeData',
    initialState: {},
    reducers: {
        pushData: (state, action) => {
            const {id, packet} = action.payload;

            // put new data at front of array
            let data = state[id];
            data = [packet, ...data];

            // if the data is longer than 100 entries, pop old data
            while (data.length > 100) {
                data.pop();
            }

            state[id] = data;
        },
        setData: (state, action) => {
            const {id, data} = action.payload;

            state[id] = data;
        },
    },
});

export const {pushData, setData} = bikeDataSlice.actions;

export const bikeDataSelector = (id) => (state) => {
    return state.bikeData[id] || [];
};

export default bikeDataSlice.reducer;
