import useSWR from 'swr';

interface OvenData {
    id: number,
    created_at: number,
    temperature: number,
};

export type {OvenData};

const fetcher = (url: string) => {
    return fetch(url).then(res => res.json());
};

export const useOvenData = (ovenId: number) => {
    const {data, error} = useSWR(`/api/oven/${ovenId}`, fetcher);

    if (error) return null;
    if (!data) return [];

    return data;
};
