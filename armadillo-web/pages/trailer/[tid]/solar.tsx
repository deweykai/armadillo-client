import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { useTrailer } from '../../../common/trailer';
import SolarPowerGraph from '../../../components/solar/SolarPowerGraph';
import Error from '../../../components/error';

export default function Solar() {
    const router = useRouter();
    const tid = Number(router.query.tid);

    const trailer = useTrailer(tid);

    let error;
    
    if (trailer === null) {
        error = <Error msg="Trailer not found" />
    }

    if (trailer?.solars.length == 0) {
        error = <Error msg="Trailer has no solar data" />
    }

    const name = trailer ? trailer.name : "error";

    return (
        <Layout name={name}>
            {error ? error :
            <div className="grid m-3">
                <SolarPowerGraph solarId={trailer!.solars[0]} />
            </div>
            }
        </Layout>
    );
};