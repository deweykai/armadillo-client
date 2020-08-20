import {pushData, clearData} from '../features/sourceData/sourceDataSlice';
import * as rxjs from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {getServerTime, getSourceData} from './api';
import type {BikeData, SolarData, OvenData, DataPoint} from '../features/sourceData/sourceDataSlice';
import type {AppDispatch} from '../App/store';

interface TrailerData {
    name: string,
    location: string,
    bikes: Array<number>,
    ovens: Array<number>,
    solars: Array<number>,
};

const getDataIds = (trailer: TrailerData) => ([
    trailer.bikes.map((bike) => `bike/${bike}`),
    trailer.ovens.map((oven) => `oven/${oven}`),
    trailer.solars.map((solar) => `solar/${solar}`),
]).flat();

const fetchData = (from: number, until: number) => (id: string) => new rxjs.Observable<[string, Array<DataPoint>]>(subscriber => {
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

let trailer: TrailerData | null = null;
let changedTarget = false;
let interval: number | null = null;

const downloadData = (dispatch: AppDispatch, from: number, until: number) => {
    // can't do anything if there is no data.
    if (trailer === null) return;

    // fetch initial data for bikes
    const trailerData = rxjs.from(getDataIds(trailer))
        .pipe(
            mergeMap(fetchData(from, until))
        );

    trailerData.subscribe(
        (res: [string, Array<DataPoint>]) => dispatch(pushData({id: res[0], packet: res[1]})),
        err => console.error(err),
    );
}

const start = (newTrailer: TrailerData, dispatch: AppDispatch) => {
    trailer = newTrailer;
    changedTarget = true;

    if (interval !== null) return;

    let startLoop = async () => {
        let until = (await getServerTime()).data;
        let from = until;
        let innerLoop = async () => {
            if (changedTarget) {
                changedTarget = false;
                dispatch(clearData());
                console.log('changed target to %s', trailer);
                from = until - (60 * 5);
            }
            if (trailer !== null) {
                downloadData(dispatch, from, until);
                from = until;
                until = (await getServerTime()).data;
            }
        };
        innerLoop();
        interval = window.setInterval(innerLoop, 1000);
    };

    startLoop();
};

const stop = () => {
    console.log('stopping downloader');
    trailer = null;
};

export default {
    start, stop
};
