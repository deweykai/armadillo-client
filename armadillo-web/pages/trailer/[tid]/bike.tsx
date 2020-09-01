import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { useTrailer } from '../../../common/trailer';
import Error from '../../../components/error';

export default function Bike() {
    const router = useRouter();
    const tid = Number(router.query.tid);

    const trailer = useTrailer(tid);

    let error;

    if (trailer === null) {
        error = <Error msg="Trailer data not found" />
    } else if (trailer?.bikes.length === 0) {
        error = <Error msg="No bike data found" />
    }

    const name = trailer ? trailer.name : "error";

    let bikeGraphs;

    return (
        <Layout name={name}>
            {error ? error :
            <div className="grid gap-3 m-3">
                {bikeGraphs}
            </div>
            }            
        </Layout>
    );
};