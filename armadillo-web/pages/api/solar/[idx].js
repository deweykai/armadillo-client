const exampleSolarData = [{
    power: 10,
    created_at: 0,
}]

export default (req, res) => {
    res.statusCode = 200
    res.json(exampleSolarData)
}