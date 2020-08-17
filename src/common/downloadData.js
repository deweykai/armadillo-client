import {pushData} from '../features/sourceData/sourceDataSlice';
import * as rxjs from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {getServerTime, getSourceData} from './api';

const getDataIds = trailer => ([
    trailer.bikes.map(bike => `bike/${bike}`),
    trailer.ovens.map(oven => `oven/${oven}`),
    trailer.solars.map(solar => `solar/${solar}`),
]).flat();

const fetchData = (from, until) => id => new rxjs.Observable(subscriber => {
    getSourceData(id, from, until)
        .then(res => {
            if (res.ok) {
                subscriber.next([id, res.data]);
            } else {
                console.error(res.statusText);
            }
            subscriber.complete();
        });
});

let trailer = null;
let interval = null;
let running = false;

const downloadData = (dispatch, from, until) => {
    // can't do anything if there is no data.
    if (trailer === null) return;
    console.log(from, until);

    // fetch initial data for bikes
    const trailerData = rxjs.from(getDataIds(trailer))
        .pipe(
            mergeMap(fetchData(from, until))
        );

    trailerData.subscribe(console.log);

    trailerData.subscribe(
        res => dispatch(pushData({id: res[0], packet: res[1]})),
        err => console.error(err),
    );
}

const start = (newTrailer, dispatch) => {
    trailer = newTrailer;
    running = true;

    console.assert(interval === null);
    if (interval !== null) return;

    let startLoop = async () => {
        let until = (await getServerTime()).data;
        let from = until - (60 * 5);
        let innerLoop = async () => {
            if (running) {
                downloadData(dispatch, from, until);
                from = until;
                until = (await getServerTime()).data;
            }
        };
        innerLoop();
        interval = setInterval(innerLoop, 1000);
    };

    startLoop();
};

const stop = () => {
    console.log('stopping downloader');
};

export default {
    start, stop
};
