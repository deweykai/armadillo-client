import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import TrailerDescription from '../../../components/trailer/TrailerDescription';
import { useTrailer } from '../../../common/trailer';
import BikeSumPowerGraph from '../../../components/bike/BikeSumPowerGraph';
import SolarPowerGraph from '../../../components/solar/SolarPowerGraph';
import OvenTemperatureGraph from '../../../components/oven/OvenTemperatureGraph';

export default function Trailer() {
    const router = useRouter();
    const tid = Number(router.query.tid);

    const trailer = useTrailer(tid);

    if (trailer === null) return "No Data";
    
    return (
        <Layout>
            <div className="grid grid-cols-3 p-3 gap-3">
                <div className="col-span-3">
                    <TrailerDescription trailer_id={tid} />
                </div>
                <div className="md:col-span-1 col-span-3">
                    <BikeSumPowerGraph bikeIdList={trailer.bikes} />
                </div>
                <div className="md:col-span-1 col-span-3">
                    <SolarPowerGraph solarId={trailer.solars[0]} />
                </div>
                <div className="md:col-span-1 col-span-3">
                    <OvenTemperatureGraph ovenId={trailer.ovens[0]} />
                </div>
            </div>
        </Layout>
    );
};