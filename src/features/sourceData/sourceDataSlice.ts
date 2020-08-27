import {createSlice} from '@reduxjs/toolkit';

enum DataType {
    Bike = 'bike',
    Oven = 'oven',
    Solar = 'solar',
};

type DataPoint = BikeData | OvenData | SolarData;

interface BikeData {
    id: number,
    created_at: number,
    current: number,
    voltage: number,
    rpm: number
};

interface OvenData {
    id: number,
    created_at: number,
    temperature: number,
};

interface SolarData {
    id: number,
    created_at: number,
    power: number,
};

export type {BikeData, OvenData, SolarData, DataPoint};

interface DataState {
    bike: {
        [id: number]: Array<BikeData>,
    },
    oven: {
        [id: number]: Array<OvenData>,
    },
    solar: {
        [id: number]: Array<SolarData>,
    },
};

const idValidator = /^(bike|oven|solar)\/([0-9]+)$/;

function getIdMatch(id: string): Array<string> {
    let match = id.match(idValidator);
    if (match == null || match.length != 3) {
        console.error(match);
        console.error('invalid id %s', id);
        return ['', '', ''];
    } else {
        return match;
    }
}

function getType (id: string): DataType {
    let dataType;
    switch (getIdMatch(id)[1]) {
        case "bike":
            dataType = DataType.Bike;
            break;
        case "oven":
            dataType = DataType.Oven;
            break;
        case "solar":
            dataType = DataType.Solar;
            break;
        default:
            dataType = DataType.Bike;
    }
    return dataType;
}

function getId (id: string): number {
    let dataId = Number(getIdMatch(id)[2]);
    return Number(dataId);
}

export const sourceDataSlice = createSlice({
    name: 'sourceData',
    initialState: {
        bike: [],
        oven: [],
        solar: [],
    },
    reducers: {
        pushData: (state: DataState, action: {payload: {id: string, packet: any}}) => {
            const {id, packet} = action.payload;

            console.assert(packet);

            // put new data at front of array
            let dataType = getType(id); 
            let dataId = getId(id);
            let dataSet = state[dataType];
            let data = dataSet[dataId] || [];
            data = [...packet, ...data];

            // if the data is longer than 5 minutes entries, pop old data
            const max_length = 60 * 5;
            while (data.length > max_length) {
                data.pop();
            }

            dataSet[dataId] = data;
        },
        clearData: (state: DataState) => {
            state.bike = [];
            state.oven = [];
            state.solar = [];
        }
    },
});

export const {pushData, clearData} = sourceDataSlice.actions;

// this has to return the same empty array when fails because
// [] != []
// Returning a new [] instance causes
const emptyArray: Array<DataPoint> = [];

const sourceDataSelector = <T>(type: DataType) => (id: number) => (state: any): Array<T> | null => {
    return state.sourceData[type][id] || null; 
};

export const bikeDataSelector = sourceDataSelector<BikeData>(DataType.Bike);
export const ovenDataSelector = sourceDataSelector<OvenData>(DataType.Oven);
export const solarDataSelector = sourceDataSelector<SolarData>(DataType.Solar);

const sourceDataListSelector = <T>(type: DataType) => (idList: Array<number>) => (state: any): Array<Array<T>> | null => {
    let dataList = [];
    for (let i = 0; i < idList.length; i++) {
        dataList.push(state.sourceData[type][idList[i]] || emptyArray);
    }

    if (dataList.length === 0) return null;
    return dataList;
};

export const bikeDataListSelector = sourceDataListSelector<BikeData>(DataType.Bike);
export const ovenDataListSelector = sourceDataListSelector<OvenData>(DataType.Oven);
export const solarDataListSelector = sourceDataListSelector<SolarData>(DataType.Solar);

export default sourceDataSlice.reducer;
