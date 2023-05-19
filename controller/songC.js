const Song = require('../models/song')
const Artis = require('../models/artist');
const User = require("../models/user");
const logger = require("../logger");
const getAllSong = async (req, res, next) => {
    try {
        const songs = await Song.find().populate("artist_Id");
        res.status(200).json(songs);
    } catch (err) {
        next([err.message, 500])
    }
}

const getByArtist = (async (req, res, next) => {
    try {
        const { query } = req;
        const artist = await Artis.findOne({ artis_name: { $regex: query.artisname } })
        const song = await Song.find({ artist_Id: artist._id }).populate("artist_Id")
        res.status(200).json(song);
    }
    catch (err) {
        next([err.message, 500])

    }

})
const addNewSong = (async (req, res, next) => {
    try {
        const song = new Song(req.body)
        await song.save()
        const s = await song.populate("artist_Id");
        res.status(200).json(s)

    }
    catch (err) {
        next([err.message, 500])
    }



})

module.exports = {
    addNewSong,
    getByArtist,
    getAllSong

}