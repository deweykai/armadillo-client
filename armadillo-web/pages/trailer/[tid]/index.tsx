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
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TrailerDescription trailer_id={tid} />
                </Grid>
                <Grid container item spacing={1}>
                    <Grid item sm={12} md={4} key={'bike'}>
                        <BikeSumPowerGraph bikeIdList={trailer.bikes} />
                    </Grid>
                    <Grid item sm={12} md={4} key={'solar'}>
                        <SolarPowerGraph solarId={trailer.solars[0]} />
                    </Grid>
                    <Grid item sm={12} md={4} key={'oven'}>
                        <OvenTemperatureGraph ovenId={trailer.ovens[0]} />
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
};