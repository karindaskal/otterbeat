const router = require("express").Router();
const Song = require('../models/song')

const { auth } = require("../middleware/auth")
const {
    getAllSong,
    getByArtist,
    addNewSong
} = require("../controller/songC")
router.put("/", addNewSong)
router.get("/artist", getByArtist)
router.get("/", getAllSong)

module.exports = router