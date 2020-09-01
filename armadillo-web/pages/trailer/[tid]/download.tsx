import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { useTrailer } from '../../../common/trailer';
import DownloadForm from '../../../components/DownloadForm';
import Error from '../../../components/error';

export default function Solar() {
    const router = useRouter();
    const tid = Number(router.query.tid);

    const trailer = useTrailer(tid);

    let error;
    
    if (trailer === null) {
        error = <Error msg="Trailer not found" />
    }

    const name = trailer ? trailer.name : "error";

    return (
        <Layout name={name}>
            {error ? error :
                <DownloadForm />
            }
        </Layout>
    );
};