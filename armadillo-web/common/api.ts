import type {DataPoint} from '../features/sourceData/sourceDataSlice';

const apiEndPoint = '/api';

interface TrailerListData {
    id: number,
    name: string,
    location: string,
};

interface Response<T> {
    data: T | null,
    ok: boolean,
    statusText: string,
    url: string,
};

export type {Response};

const response = <T>(data: T | null, ok: boolean, statusText: string, url: string): Response<T> => ({data, ok, statusText, url});

const myFetch= async <T>(url: string): Promise<Response<T>> => {
    const res = await fetch(url);

    if (res.status !== 200) {
        return response<T>(null, false, res.statusText, res.url);
    }

    return response(await res.json(), true, '', res.url);
};

export const getTrailerList = async () => {
    return await myFetch<Array<TrailerListData>(`${apiEndPoint}/trailer`)
};

export const getTrailerData = async (id: number) => {
    return await myFetch<any>(`${apiEndPoint}/trailer/${id}`);
};

export const getServerTime = async () => {
    return await myFetch<number>(`${apiEndPoint}/time`);
};

export const getSourceData = async (id: string, from: number, until: number) => {
    // id in the format of `bike/bike_id`
    return await myFetch<Array<DataPoint>>(`${apiEndPoint}/data/${id}?from=${from}&until=${until}`);
};
