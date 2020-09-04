export default function(req, res) {
    const {
        query: {
            id,
            from,
            until,
        },
    } = req;

    res.redirect(`${process.env.DATA_URL}/data/${id}/csv?from=${from}&until=${until}`);
}