import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import TrailerDescription from '../../../components/trailer/TrailerDescription';
import { useTrailer } from '../../../common/trailer';
import BikeSumPowerGraph from '../../../components/bike/BikeSumPowerGraph';
import SolarPowerGraph from '../../../components/solar/SolarPowerGraph';
import OvenTemperatureGraph from '../../../components/oven/OvenTemperatureGraph';
import Error from '../../../components/error';

export default function Trailer() {
    const router = useRouter();
    const tid = Number(router.query.tid);

    const trailer = useTrailer(tid);

    let error;

    if (trailer === null) {
        error = <Error msg="No trailer data" />
    }

    const name = trailer ? trailer.name : "error";
    
    return (
        <Layout name={name}>
            {error ? error 
            :
            <div className="grid grid-cols-3 m-3 gap-3">
                <div className="col-span-3">
                    <TrailerDescription trailer_id={tid} />
                </div>
                <div className="lg:col-span-1 col-span-3">
                    <BikeSumPowerGraph bikeIdList={trailer!.bikes} />
                </div>
                <div className="lg:col-span-1 col-span-3">
                    <SolarPowerGraph solarId={trailer!.solars[0]} />
                </div>
                <div className="lg:col-span-1 col-span-3">
                    <OvenTemperatureGraph ovenId={trailer!.ovens[0]} />
                </div>
            </div>
            }
        </Layout>
    );
};