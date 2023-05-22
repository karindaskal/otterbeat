const mongoose = require("mongoose")

const SongSecm = new mongoose.Schema({

    artist_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artist'
    },
    song_title: {
        type: String,
        required: true,

    },
    duration: {
        type: String,

    },
    duration_sec: {
        type: Number,

    },
    release_year: {
        type: String,

    },



},
    { timestamps: true });
module.exports = mongoose.model("songs", SongSecm)