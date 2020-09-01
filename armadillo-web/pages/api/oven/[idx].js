const exampleOvenData = [{
    temperature: 10,
    created_at: 0,
}]

export default (req, res) => {
    res.statusCode = 200
    res.json(exampleOvenData)
}