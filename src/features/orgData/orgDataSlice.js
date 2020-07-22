import { createSlice } from '@reduxjs/toolkit';

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

export const fetchOrgData = (id) => (dispatch, getState) => {
    const { status } = getState();
    if (status === 'loading') return;

    dispatch(loading())

    fetch(`/api/org/${id}`)
        .then(res => res.json())
        .then(data => {
            dispatch(setData({ data }));
            dispatch(success());
        })
        .catch(err => {
            console.error(err);
            dispatch(failed());
        });
};

export const fetchOrgList = () => (dispatch, getState) => {
    const { status } = getState();
    if (status === 'loading') return;

    dispatch(loading())

    fetch('/api/org')
        .then(res => res.json())
        .then(list => {
            dispatch(setList({ list }));
            dispatch(success());
        })
        .catch(err => {
            console.error(err);
            dispatch(failed());
        });
};

export default orgDataSlice.reducer;