const axios = require('axios')

export default async (req, res) => {
    try {
        const resp = await axios.get(`${process.env.BACKEND}/trailer`);
        res.statusCode = 200
        res.json(resp.data);
    } catch (err) {
        console.log(err);
        res.status(err.response.status);
        res.end(err.response.data);
    }
}