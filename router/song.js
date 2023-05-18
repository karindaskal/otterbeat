const router = require("express").Router();
const Song = require('../models/song')
const Artis = require('../models/artist');
const User = require("../models/user");
const {
    getFavorite,
    getByArtist
} = require("../controller/songC")
router.get("/:artisname", getByArtist)
router.get("/:id/favorite", getFavorite)
module.exports = router