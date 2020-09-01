import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import TrailerDescription from '../../../components/trailer/TrailerDescription';
import { useTrailer } from '../../../common/trailer';
import BikeSumPowerGraph from '../../../components/bike/BikeSumPowerGraph';
import SolarPowerGraph from '../../../components/solar/SolarPowerGraph';
import OvenTemperatureGraph from '../../../components/oven/OvenTemperatureGraph';
import { toUnicode } from 'punycode';

const OvenData = () => {
    const trailer = useTrailer();
    const ovenId = trailer.ovens[0];

    return (<OvenTemperatureGraph ovenId={ovenId} />);
};

const SolarData = () => {
    const trailer = useTrailer();
    const solarId = trailer.solars[0];

    return (
        <SolarPowerGraph solarId={solarId} />
    );
};

const AggregateBikeData = () => {
    const trailer = useTrailer();

    return (
        <BikeSumPowerGraph bikeIdList={trailer.bikes} />
    );
}

export default function Trailer() {
    const router = useRouter();
    const {tid} = router.query;

    const trailer = useTrailer();

    if (trailer === null) return "No Data";
    
    return (
        <Layout>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TrailerDescription trailer_id={trailerId} />
                </Grid>
                <Grid container item spacing={1}>
                    <Grid item sm={12} md={4} key={'bike'}>
                        <AggregateBikeData trailerId={trailerId} />
                    </Grid>
                    <Grid item sm={12} md={4} key={'solar'}>
                        <SolarData trailerId={trailerId} />
                    </Grid>
                    <Grid item sm={12} md={4} key={'oven'}>
                        <OvenData trailerId={trailerId} />
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
};