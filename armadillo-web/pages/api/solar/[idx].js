const axios = require('axios')

export default async (req, res) => {
    const {
        query: {
            idx,
        },
    } = req;

    try {
        const resp = await axios.get(`http://localhost:3001/data/solar/${idx}`);
        res.json(resp.data);
    } catch (err) {
        res.status(err.response.status);
        res.end(err.response.data);
    }
}