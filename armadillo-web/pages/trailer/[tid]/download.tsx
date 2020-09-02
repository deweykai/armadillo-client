import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { useTrailer } from '../../../common/trailer';
import DownloadForm from '../../../components/DownloadForm';
import Error from '../../../components/error';
import GridItem from '../../../components/gridItem';

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
            <div className="m-3">
                <GridItem title="Download">
                    <DownloadForm bikeIds={trailer?.bikes} ovenIds={trailer?.ovens} solarIds={trailer?.solars}/>
                </GridItem>
            </div>
            }
        </Layout>
    );
};