const axios = require('axios')

export default async (req, res) => {
    try {
        const resp = await axios.get('http://localhost:3001/trailer');
        res.statusCode = 200
        res.json(resp.data);
    } catch (err) {
        console.log(err);
        res.status(err.response.status);
        res.end(err.response.data);
    }
}