const WAIT = 'WAIT';

const wait = () => ({
    type: WAIT,
});

const waitApp = (state, action) => {
    if (state == undefined) {
        return 'waiting';
    }

    return state;
}

export default waitApp;