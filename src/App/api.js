const apiEndPoint = '/api';

const response = (data, ok, statusText, url) => ({data, ok, statusText, url});

const convert = async (res) => {
    if (res.status !== 200) {
        return response(null, false, res.statusText, res.url);
    }

    return response(await res.json(), true, '', res.url);
};

export const getOrgList = async () => {
    const res = await fetch(`${apiEndPoint}/org`);
    return await convert(res);
};

export const getOrgData = async (id) => {
    const res = await fetch(`${apiEndPoint}/org/${id}`);
    return await convert(res);
};

export const getBikeData = async (id, count) => {
    const res = await fetch(`${apiEndPoint}/data/bike/${id}?count=${count}`);
    return await convert(res);
};

export const getOvenData = async (id, count) => {
    const res = await fetch(`${apiEndPoint}/data/oven/${id}?count=${count}`);
    return await convert(res);
};

export const getMicrogridData = async (id, count) => {
    const res = await fetch(`${apiEndPoint}/data/microgrid/${id}?count=${count}`);
    return await convert(res);
};

export const getBikeUpdateSocket = (id) => {
    const socket = new WebSocket(`ws://${window.location.host}/ws/bike/${id}`);
    return socket;
};
