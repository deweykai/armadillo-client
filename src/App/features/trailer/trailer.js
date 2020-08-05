import {useSelector} from 'react-redux';

// will return null with error
export const useTrailer = (trailerId) => {
    console.assert(typeof trailerId === "number");
    const orgData = useSelector((state) => state.orgData.data);
    if (orgData === null) return null;
    const trailer = orgData.trailers.find((trailer) => trailer.id === Number(trailerId));

    return trailer;
};
