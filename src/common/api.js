const apiEndPoint = '/api';

const response = (data, ok, statusText, url) => ({data, ok, statusText, url});

const convert = async (res) => {
    if (res.status !== 200) {
        return response(null, false, res.statusText, res.url);
    }

    return response(await res.json(), true, '', res.url);
};

export const getTrailerList = async () => {
    const res = await fetch(`${apiEndPoint}/trailer`);
    return await convert(res);
}

export const getTrailerData = async (id) => {
    const res = await fetch(`${apiEndPoint}/trailer/${id}`);
    return await convert(res);
};

export const getSourceData = async (id, count) => {
    // id in the format of `bike/bike_id`
    const res = await fetch(`${apiEndPoint}/data/${id}?count=${count}`);
    return await convert(res);
};

export const getBikeUpdateSocket = (id) => {
    const socket = new WebSocket(`ws://${window.location.host}/ws/bike/${id}`);
    return socket;
};
