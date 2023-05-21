const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = () => {
    const MONGO_URL = process.env.MONGO_URL;
    mongoose.connect(MONGO_URL)
        .then(() => console.log("connected to db"))
        .catch((error) => console.log(error));

}


module.exports = { connectToDB }