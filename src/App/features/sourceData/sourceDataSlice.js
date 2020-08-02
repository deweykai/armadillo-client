import {createSlice} from '@reduxjs/toolkit';

export const sourceDataSlice = createSlice({
    name: 'sourceData',
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

export const {pushData, setData} = sourceDataSlice.actions;

const sourceDataSelector = type => id => state => {
    return state.sourceData[`${type}/${id}`] || [];
};

export const bikeDataSelector = sourceDataSelector('bike');
export const ovenDataSelector = sourceDataSelector('oven');
export const microgridDataSelector = sourceDataSelector('microgrid');

export default sourceDataSlice.reducer;
