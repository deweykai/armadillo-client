const axios = require('axios')

export default async (req, res) => {
    const {
        query: {
            tid,
        },
    } = req;

    try {
        const resp = await axios.get(`http://localhost:3001/trailer/${tid}`);
        res.json(resp.data);
    } catch (err) {
        console.log(err);
        res.status(err.response.status);
        res.end(err.response.data);
    }
}