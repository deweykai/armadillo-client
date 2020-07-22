import { createSlice } from '@reduxjs/toolkit';
import { getOrgData, getOrgList } from '../../App/api';

const initialState = {
    status: 'idle',
    list: [],
    data: null,
};

const defaultOrg = () => ({
    id: 0,
    trailers: [],
    bikes: [],
});

export const orgDataSlice = createSlice ({
    name: 'orgData',
    initialState,
    reducers: {
        setList: (state, action) => { state.list = action.payload.list },
        setData: (state, action) => { state.data = action.payload.data },
        unsetData: state => { state.data = null },
        loading: state => { state.status = 'loading' },
        failed: state => { state.status = 'failed' },
        success: state => { state.status = 'success' },
    },
});

export const { setList, setData, unsetData, loading, failed, success } = orgDataSlice.actions;

export const fetchOrgData = id => async (dispatch, getState) => {
    const { status } = getState();
    if (status === 'loading') return;

    dispatch(loading())

    let res = await getOrgData(id);
    if (!res.ok) {
        console.error(res.statusText);
        dispatch(failed());
    }

    const data = res.data;

    dispatch(setData({ data }));
    dispatch(success());
};

export const fetchOrgList = () => async (dispatch, getState) => {
    const { status } = getState();
    if (status === 'loading') return;

    dispatch(loading())

    let res = await getOrgList();
    if (!res.ok) {
        console.error(res.statusText);
        dispatch(failed());
    }

    const data = res.data;

    dispatch(setList({ list: data }));
    dispatch(success());
};

export default orgDataSlice.reducer;