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

// this has to return the same empty array when fails because
// [] != []
// Returning a new [] instance causes
const emptyArray = [];

const sourceDataSelector = type => id => state => {
    return state.sourceData[`${type}/${id}`] || emptyArray; 
};

export const bikeDataSelector = sourceDataSelector('bike');
export const ovenDataSelector = sourceDataSelector('oven');
export const microgridDataSelector = sourceDataSelector('microgrid');

const sourceDataListSelector = type => idList => state => {
    let dataList = [];
    for (let i = 0; i < idList.length; i++) {
        dataList.push(state.sourceData[`${type}/${idList[i]}`] || emptyArray);
    }

    return dataList;
};

export const bikeDataListSelector = sourceDataListSelector('bike');
export const ovenDataListSelector = sourceDataListSelector('oven');
export const microgridDataListSelector = sourceDataListSelector('microgrid');

export default sourceDataSlice.reducer;
