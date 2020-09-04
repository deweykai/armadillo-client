const axios = require('axios')

export default async (req, res) => {
    let {
        query: {
            ids,
        },
    } = req;

    ids = ids.split(',');

    const resp = await Promise.all(
        ids.map(
            id => axios.get(`${process.env.BACKEND}/data/bike/${id}`).catch(err => [])
        )
    );

    let data = resp.map(resp => resp.data).filter(a => !!a);

    res.json(data);
}