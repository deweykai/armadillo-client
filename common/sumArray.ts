import type {GraphData} from './graphData';

export const sumArrays = (data: GraphData[][]) => {
    // use dictionary for sum

    let sums: Record<number, number> = {}
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            let entry = data[i][j];
            sums[entry.x] = sums[entry.x] || 0;
            sums[entry.x] += entry.y;
        }
    }

    let sumList = [];

    for (let x in sums) {
        sumList.push({x, y: sums[x]})
    }

    return sumList;
};
