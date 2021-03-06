const axios = require('axios')

export default async (req, res) => {
    const {
        query: {
            idx,
        },
    } = req;

    try {
        const resp = await axios.get(`${process.env.BACKEND}/data/bike/${idx}`);
        res.json(resp.data);
    } catch (err) {
        res.status(err.response.status);
        res.end(err.response.data);
    }
}