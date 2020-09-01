const exampleTrailer = {
    name: "Test",
    location: "Test",
    bikes: [1, 2, 3],
    ovens: [1],
    solars: [1],
};

export default (req, res) => {
    res.statusCode = 200
    res.json(exampleTrailer)
}