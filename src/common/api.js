const apiEndPoint = '/api';

const response = (data, ok, statusText, url) => ({data, ok, statusText, url});

const myFetch= async (url) => {
    const res = await fetch(url);

    if (res.status !== 200) {
        return response(null, false, res.statusText, res.url);
    }

    return response(await res.json(), true, '', res.url);
};

export const getTrailerList = async () => {
    return await myFetch(`${apiEndPoint}/trailer`)
};

export const getTrailerData = async (id) => {
    return await myFetch(`${apiEndPoint}/trailer/${id}`);
};

export const getServerTime = async () => {
    return await myFetch(`${apiEndPoint}/time`);
};

export const getSourceData = async (id, from, until) => {
    // id in the format of `bike/bike_id`
    return await myFetch(`${apiEndPoint}/data/${id}?from=${from}&until=${until}`);
};
