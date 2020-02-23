module.exports = (err, res) => {
    try {
        res.json({
            code: err.status,
            message: err.message
        })
    } catch (err) {
        res.json({
            code: 500,
            message: "internal server error"
        })
    }
}