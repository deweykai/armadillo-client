import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import TrailerDescription from '../../../components/trailer/TrailerDescription';
import { useTrailer } from '../../../common/trailer';
import BikeSumPowerGraph from '../../../components/bike/BikeSumPowerGraph';
import SolarPowerGraph from '../../../components/solar/SolarPowerGraph';
import OvenTemperatureGraph from '../../../components/oven/OvenTemperatureGraph';
import GridItem from '../../../components/gridItem';
import Error from '../../../components/error';

export default function Trailer() {
    const router = useRouter();
    const tid = Number(router.query.tid);

    const trailer = useTrailer(tid);

    let error;

    if (trailer === null) {
        error = <Error msg="No trailer data" />
    } else if (isNaN(tid)) {
        error = <Error msg="Invalid trailer id" />
    }

    const name = trailer ? trailer.name : "error";
    
    return (
        <Layout name={name}>
            {error ? error 
            :
            <div className="grid grid-cols-3 m-3 gap-3">
                <div className="col-span-3">
                    <GridItem title="Trailer">
                        <TrailerDescription name={trailer!.name} location={trailer!.location} />
                    </GridItem>
                </div>
                <div className="lg:col-span-1 col-span-3">
                    <GridItem title="Bike Power">
                        <BikeSumPowerGraph bikeIdList={trailer!.bikes} />
                    </GridItem>
                </div>
                <div className="lg:col-span-1 col-span-3">
                    <GridItem title="Solar Power">
                        <SolarPowerGraph solarId={trailer!.solars[0]} />
                    </GridItem>
                </div>
                <div className="lg:col-span-1 col-span-3">
                    <GridItem title="Oven temperature">
                        <OvenTemperatureGraph ovenId={trailer!.ovens[0]} />
                    </GridItem>
                </div>
            </div>
            }
        </Layout>
    );
};