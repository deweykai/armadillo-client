import useSWR from 'swr';

const fetcher = (url: string) => {
    return fetch(url).then(res => res.json());
};

interface SolarData {
    id: number,
    created_at: number,
    power: number,
};

export type {SolarData};

export const useSolarData = (solarId: number) => {
    const {data, error} = useSWR(`/api/solar/${solarId}`, fetcher, {refreshInterval:1000});

    if (error) return null;
    if (!data) return [];

    return data;
};
