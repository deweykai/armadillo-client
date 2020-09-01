const trailerList = [
    {
        id: 1,
        name: "kai's house",
        location: "Japan",
    },
    {
        id: 2,
        name: "moon base",
        location: "moon",
    },
];

export default (req, res) => {
    res.statusCode = 200
    res.json(trailerList)
}