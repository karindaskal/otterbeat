const mongoose = require("mongoose")
const artistSecm = new mongoose.Schema({
    artis_name: {
        type: String
    }
})
{ timestamps: true };
module.exports = mongoose.model("artist", artistSecm)
