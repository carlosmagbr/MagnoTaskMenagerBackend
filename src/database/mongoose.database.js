const mongoose = require("mongoose")

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@magnotaskscluster.iiglca4.mongodb.net/?retryWrites=true&w=majority&appName=MagnoTasksCluster`)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error to connect to MongoDB:", error)
    }
}

module.exports = connectToDatabase