const notFoundError = (res) =>{
    return res.status(404).send("Data not found in database")
}

const ObjectIdCastError = (res) =>{
    return res.status(500).send("Id not found")
}

module.exports = {
    notFoundError,
    ObjectIdCastError
}