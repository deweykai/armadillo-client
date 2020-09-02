import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { useTrailer } from '../../../common/trailer';
import BikePowerGraph from '../../../components/bike/BikePowerGraph';
import Error from '../../../components/error';
import GridItem from '../../../components/gridItem';
import { Grid } from '@material-ui/core';

export default function Bike() {
    const router = useRouter();
    const tid = Number(router.query.tid);

    const trailer = useTrailer(tid);

    let error;

    if (trailer === null) {
        error = <Error msg="Trailer data not found" />
    } else if (trailer?.bikes.length === 0) {
        error = <Error msg="No bike data found" />
    } else if (isNaN(tid)) {
        error = <Error msg="Invalid trailer id" />
    }

    const name = trailer ? trailer.name : "error";

    let bikeGraphs = [];

    if (trailer !== null) {
        for (let i = 0; i < trailer?.bikes.length; i++) {
            let bikeId = trailer?.bikes[i];
            bikeGraphs.push(
                <GridItem title={`Bike ${bikeId}`}>
                    <BikePowerGraph bike_id={bikeId} />
                </GridItem>
            )
        }
    }

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