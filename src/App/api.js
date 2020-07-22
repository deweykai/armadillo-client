const apiEndPoint = '/api';

const response = (data, ok, statusText) => ({ data, ok, statusText });

const convert = async res => {
    if (res.status !== 200) {
        return response(null, false, res.statusText);
    }

    return response(await res.json(), true, '');
};

export const getOrgList = async id => {
    const res = await fetch(`${apiEndPoint}/org`);
    return await convert(res);
};

export const getOrgData = async id => {
    const res = await fetch(`${apiEndPoint}/org/${id}`)
    return await convert(res);
};

export const getBikeData = async id => {
    const res = await fetch(`${apiEndPoint}/data/bike/${id}`);
    return await convert(res);
};

export const getBikeUpdateSocket = id => {
    const socket = new WebSocket(`ws://${window.location.host}/bike/${id}`);
    return socket;
};