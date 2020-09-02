import useSWR from 'swr';

interface BikeData {
    id: number,
    created_at: number,
    current: number,
    voltage: number,
    rpm: number
};

export type {BikeData};

const fetcher = (url: string) => {
    return fetch(url).then(res => res.json());
};

export const useBikeData = (bikeId: number) => {
    const {data, error} = useSWR(`/api/bike/${bikeId}`, fetcher, {refreshInterval: 1000});

    if (error) return null;
    if (!data) return [];

    return data;
};

export const useBikeListData = (tid: number) => {
    const {data, error} = useSWR(`/api/trailer/${tid}/bike`, fetcher, {refreshInterval: 1000});

    if (error) return null;
    if (!data) return [[]];

    return data;
};
