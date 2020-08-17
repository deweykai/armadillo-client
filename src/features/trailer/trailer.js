import {useSelector} from 'react-redux';

// will return null with error
export const useTrailer = () => {
    const trailer = useSelector((state) => state.trailer);
    if (trailer.status !== 'success') return null;

    return trailer.data;
};
