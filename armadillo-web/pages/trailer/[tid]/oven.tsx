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