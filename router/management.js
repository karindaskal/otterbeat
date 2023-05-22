const router = require("express").Router();
const {
    mostFavorableSong,
    mostFavorableArtist,
    mostFavorableSongDecade,
    longestSongs,
    shortestSongs
} = require("../controller/managementC")
router.get("/songdecade", mostFavorableSongDecade)
router.get("/artist", mostFavorableArtist)
router.get("/song", mostFavorableSong)
router.get("/longest", longestSongs)
router.get("/shortest", shortestSongs)
module.exports = router