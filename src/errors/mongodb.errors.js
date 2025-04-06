const notFoundError = (res) =>{
    return res.status(404).send("Data not found in database")
}

module.exports = {
    notFoundError,
}