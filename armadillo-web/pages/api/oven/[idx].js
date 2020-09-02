const axios = require('axios')

export default async (req, res) => {
    const {
        query: {
            idx,
        },
    } = req;

    try {
        const resp = await axios.get(`http://localhost:3001/data/oven/${idx}`);
        res.json(resp.data);
    } catch (err) {
        console.log(err);
        res.status(err.response.status);
        res.end(err.response.data);
    }
}