const notFoundMiddlware = (req, res) => {
    res.send("<h1>Resource Not Found</h1>")
}

module.exports = notFoundMiddlware