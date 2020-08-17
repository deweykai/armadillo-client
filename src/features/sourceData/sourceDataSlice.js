import {createSlice} from '@reduxjs/toolkit';

export const sourceDataSlice = createSlice({
    name: 'sourceData',
    initialState: {},
    reducers: {
        pushData: (state, action) => {
            const {id, packet} = action.payload;

            console.assert(packet);

            // put new data at front of array
            let data = state[id] || [];
            data = [...packet, ...data];

            // if the data is longer than 5 minutes entries, pop old data
            const max_length = 60 * 5;
            while (data.length > max_length) {
                data.pop();
            }

            state[id] = data;
        },
    },
});

export const {pushData} = sourceDataSlice.actions;

// this has to return the same empty array when fails because
// [] != []
// Returning a new [] instance causes
const emptyArray = [];

const sourceDataSelector = type => id => state => {
    return state.sourceData[`${type}/${id}`] || emptyArray; 
};

export const bikeDataSelector = sourceDataSelector('bike');
export const ovenDataSelector = sourceDataSelector('oven');
export const solarDataSelector = sourceDataSelector('solar');

const sourceDataListSelector = type => idList => state => {
    let dataList = [];
    for (let i = 0; i < idList.length; i++) {
        dataList.push(state.sourceData[`${type}/${idList[i]}`] || emptyArray);
    }

    return dataList;
};

export const bikeDataListSelector = sourceDataListSelector('bike');
export const ovenDataListSelector = sourceDataListSelector('oven');
export const solarDataListSelector = sourceDataListSelector('solar');

export default sourceDataSlice.reducer;
