import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { useTrailer } from '../../../common/trailer';
import SolarPowerGraph from '../../../components/solar/SolarPowerGraph';
import Error from '../../../components/error';
import GridItem from '../../../components/gridItem';

export default function Solar() {
    const router = useRouter();
    const tid = Number(router.query.tid);

    const trailer = useTrailer(tid);

    let error;
    
    if (trailer === null) {
        error = <Error msg="Trailer not found" />
    } else if (trailer?.solars.length === 0) {
        error = <Error msg="Trailer has no solar data" />
    } else if (isNaN(tid)) {
        error = <Error msg="Invalid trailer id" />
    }

    const name = trailer ? trailer.name : "error";

    return (
        <Layout name={name}>
            {error ? error :
            <div className="grid m-3 gap-3">
                <GridItem title="Solar Microgrid">
                    <p>ID: {trailer!.solars[0]}</p>
                </GridItem>
                <GridItem title="Power">
                    <SolarPowerGraph solarId={trailer!.solars[0]} />
                </GridItem>
            </div>
            }
        </Layout>
    );
};