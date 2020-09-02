import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import Error from '../../../components/error';
import { useTrailer } from '../../../common/trailer';
import GridItem from '../../../components/gridItem';
import OvenTemperatureGraph from '../../../components/oven/OvenTemperatureGraph';

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
                <div className="grid gap-3 m-3 grid-cols-1">
                    <div>
                        <GridItem title="Oven">
                            <p>ID: {trailer!.ovens[0]}</p>
                        </GridItem>
                    </div>
                    <div>
                        <GridItem title="Temperature">
                            <OvenTemperatureGraph ovenId={trailer!.ovens[0]} />
                        </GridItem>
                    </div>
                </div>
            </>
            }
        </Layout>
    );
};