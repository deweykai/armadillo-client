import { createSlice } from '@reduxjs/toolkit';
import { getBikeData } from '../../api';

const initialBikeState = {
    status: 'disconnected',
    fetchStatus: 'fresh',
    data: [],
};

const getBikeState = (state, id) => {
    if (state[id] === undefined) {
        state[id] = {...initialBikeState};
    }

    return state[id];
}

export const bikeDataSlice = createSlice({
    name: 'bikeData',
    initialState: {},
    reducers: {
        connect: (state, action) => {
            const { id } = action.payload;

            getBikeState(state, id).status = 'connected';
        },
        disconnect: (state, action) => {
            const { id } = action.payload;

            getBikeState(state, id).status = 'disconnected';
        },
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

            const bikeState = getBikeState(state, id);
            bikeState.data = data;

        },
        loading: (state, action) => {
            const { id } = action.payload;

            getBikeState(state, id).fetchStatus = 'loading';
        },
        success: (state, action) => {
            const { id } = action.payload;

            getBikeState(state, id).fetchStatus = 'success';

            state[id] = {
                ...state[id],
                status: 'success',
            };
        },
        failed: (state, action) => {
            const { id } = action.payload;

            getBikeState(state, id).fetchStatus = 'failed';
        },
    }
});

export const { connect, disconnect, pushData, setData, loading, success, failed } = bikeDataSlice.actions;


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
}

export const connectBike = id => (dispatch, getState) => {
    const { bikeData } = getState();

    // make sure only one connection exists at a time
    if ( bikeData[id] && bikeData[id].status === 'connected') return;

    const socket = new WebSocket(`ws://${window.location.host}/ws/bike/${id}`);

    socket.onmessage = event => {
        const packet = JSON.parse(event.data);
        console.log(packet);
        dispatch(pushData({ id, packet }));
    };

    socket.onclose = event => {
        dispatch(disconnect({ id }));
    };

    dispatch(connect({ id }));

    return socket;
}

export const bikeDataSelector = id => state => {
    let bikeData = state.bikeData[id];
    if (bikeData === undefined) {
        bikeData = {...initialBikeState};
    }
    return bikeData;
};

export default bikeDataSlice.reducer;