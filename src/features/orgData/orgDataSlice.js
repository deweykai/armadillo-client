import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    orgList: [],
    orgData: {},
};

export const orgDataSlice = createSlice ({
    name: 'orgData',
    initialState,
    reducers: {
        addOrgList(state, action) {
            state.orgList = action.orgList;
        },
        addOrgData(state, action) {
            state.orgData[action.orgId] = action.orgData;
        },
        loading(state, action) {
            state.status = 'loading';
        },
        failed(state, action) {
            state.status = 'failed';
        },
        success(state, action) {
            state.status = 'success';
        }
    }
});

export const { addOrgList, addOrgData, loading, failed, success } = orgDataSlice.actions;

export const fetchOrgList = () => (dispatch, getState)=> {
    const { status } = getState();
    if (status === 'loading') return;

    dispatch(loading())

    fetch('/api/org')
        .then(res => res.json())
        .then(list => {
            dispatch(success());
            dispatch(addOrgList(list));
        })
}

export default orgDataSlice.reducer;