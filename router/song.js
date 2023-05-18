const router = require("express").Router();
const Song = require('../models/song')

const { auth } = require("../middleware/auth")
const {
    getFavorite,
    getByArtist,
    addNewSong
} = require("../controller/songC")
router.put("/", addNewSong)
router.get("/", getByArtist)
router.get("/favorite", auth, getFavorite)
module.exports = router