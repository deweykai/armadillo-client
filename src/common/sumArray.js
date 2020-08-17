export const sumArrays = (data) => {
    // expects a list of arrays
    console.assert(data[0] !== undefined);

    // use longest array
    let longestLength = -1;
    let longestIndex = -1;

    for (let i = 0; i < data.length; i++) {
        if (data[i].length > longestLength) {
            longestLength = data[i].length;
            longestIndex = i;
        }
    }

    let sumArray = [];
    for (let i = 0; i < longestLength; i++) {
        let ySum = 0;
        for (let j = 0; j < data.length; j++) {
            if (data[j][i] === undefined) continue;
            ySum += data[j][i].y || 0;
        }
        let sum = {
            y: ySum,
            x: data[longestIndex][i].x,
        };
        sumArray.push(sum);
    }

    return sumArray;
};
