const exampleSolarData = [{
    power: 10,
}]

export default (req, res) => {
    res.statusCode = 200
    res.json(exampleSolarData)
}