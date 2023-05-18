const mongoose = require("mongoose")

const SongSecm = new mongoose.Schema({

    artist_Id: {
        type: String,
        required: true,
    },
    song_title: {
        type: String,
        required: true,

    },
    duration: {
        type: String,

    },
    release_year: {
        type: String,

    },



},
    { timestamps: true });
module.exports = mongoose.model("songs", SongSecm)