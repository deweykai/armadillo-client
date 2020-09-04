const axios = require('axios')

export default async (req, res) => {
    let {
        query: {
            ids,
        },
    } = req;

    ids = ids.split(',');

    try {
        const resp = await Promise.all(
            ids.map(id => axios.get(`${process.env.BACKEND}/data/bike/${id}`))
        );

        let data = resp.map(resp => resp.data);

        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(err.response.status);
        res.end(err.response.data);
    }
}