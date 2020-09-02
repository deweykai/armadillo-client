import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import Error from '../../../components/error';
import { useTrailer } from '../../../common/trailer';

export default function Oven() {
    const router = useRouter();
    const tid = Number(router.query.tid);

    const trailer = useTrailer(tid);

    let error;

    if (trailer === null) {
        error = <Error msg="No trailer data found" />
    } else if (trailer?.ovens.length === 0) {
        error = <Error msg="No oven data found" />
    } else if (isNaN(tid)) {
        error = <Error msg="Invalid trailer id" />
    }

    const name = trailer ? trailer.name : "error";

    return (
        <Layout name={name}>
            {error ? error :
            <>
                <h1>Oven</h1>
                <p>{tid}</p>
            </>
            }
        </Layout>
    );
};