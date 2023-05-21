const router = require("express").Router();
const Song = require('../models/song')

const { auth } = require("../middleware/auth")
const {
    getAllSong,
    getByArtist,
    addNewSong,
    deleteSong
} = require("../controller/songC")
router.put("/", addNewSong)
router.get("/artist", getByArtist)
router.get("/", getAllSong)
router.delete("/:id", deleteSong)

module.exports = router