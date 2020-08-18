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
        pushData: (state: DataState, action) => {
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
    },
});

export const {pushData} = sourceDataSlice.actions;

// this has to return the same empty array when fails because
// [] != []
// Returning a new [] instance causes
const emptyArray: Array<DataPoint> = [];

const sourceDataSelector = (type: DataType) => (id: number) => (state: any) => {
    return state.sourceData[type][id] || emptyArray; 
};

export const bikeDataSelector = sourceDataSelector(DataType.Bike);
export const ovenDataSelector = sourceDataSelector(DataType.Oven);
export const solarDataSelector = sourceDataSelector(DataType.Solar);

const sourceDataListSelector = (type: DataType) => (idList: Array<number>) => (state: any) => {
    let dataList = [];
    for (let i = 0; i < idList.length; i++) {
        dataList.push(state.sourceData[type][idList[i]] || emptyArray);
    }

    return dataList;
};

export const bikeDataListSelector = sourceDataListSelector(DataType.Bike);
export const ovenDataListSelector = sourceDataListSelector(DataType.Oven);
export const solarDataListSelector = sourceDataListSelector(DataType.Solar);

export default sourceDataSlice.reducer;
