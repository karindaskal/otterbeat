const router = require("express").Router();
const {
    mostFavorableSong,
    mostFavorableArtist,
    mostFavorableSongDecade
} = require("../controller/managementC")
router.get("/songdecade", mostFavorableSongDecade)
router.get("/artist", mostFavorableArtist)
router.get("/song", mostFavorableSong)
module.exports = router