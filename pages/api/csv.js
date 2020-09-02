export default function(req, res) {
    const {
        query: {
            id,
            from,
            until,
        },
    } = req;

    res.redirect(`http://localhost:3001/data/${id}/csv?from=${from}&until=${until}`);
}