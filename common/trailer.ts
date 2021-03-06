import useSWR from 'swr';

const fetcher = (url: string) => {
    return fetch(url).then(res => res.json());
};

interface TrailerData {
    name: string,
    location: string,
    bikes: Array<number>,
    ovens: Array<number>,
    solars: Array<number>,
};

export type {TrailerData};

// will return null with error
export const useTrailer = (tid: number): TrailerData | null => {
    const {data, error} = useSWR(`/api/trailer/${tid}`, fetcher);

    if (error) return null;
    if (!data) return null;

    return data;
};

interface TrailerListData {
    id: number,
    name: string,
    location: string,
}

export const useTrailerList = (tid: number): Array<TrailerListData> | null => {
    const {data, error} = useSWR('/api/trailer', fetcher);

    if (error) return null;
    if (!data) return [];

    return data;
}