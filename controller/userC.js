const bcrypt = require("bcrypt")
const User = require("../models/user")
const logger = require("../logger");
const NodeCache = require("node-cache");
const Song = require("../models/song");
const { addToChase, delateFronCache, hasKey, getDataParse, setKey } = require("../utils/cache")

const like = (async (req, res, next) => {
    try {
        const key = res.locals.id;
        const user = await User.findById(key)
        if (!user.favorites.includes(req.params.id)) {
            if (!res.locals.canAdd) {
                return next(["cant add more", 500])
            }
            await user.updateOne({ $push: { favorites: req.params.id } })
            if (await hasKey(key)) {
                addToChase(key, await Song.findById(req.params.id).populate("artist_Id"))
            }
            res.status(200).json("the song has been like")

        }
        else {

            await user.updateOne({ $pull: { favorites: req.params.id } })
            if (await hasKey(key)) {
                delateFronCache(key, req.params.id)
            }
            res.status(200).json("the song has been dislike")

        }

    }
    catch (err) {

        next([err, 500])
    }
})
const update = (async (req, res, next) => {

    try {
        const user_id = res.locals.id
        if (!user_id) next(["somthig worng", 500])
        else {
            const user = await User.findByIdAndUpdate(user_id, { $set: req.body, })
            res.status(200).json(user)
        }
    }
    catch (err) {
        next([err.message, 500])
    }
})
const getFavorite = (async (req, res, next) => {
    const user_id = res.locals.id
    console.log(user_id)
    try {
        if (await hasKey(user_id)) {
            console.log("fron cache")
            res.status(200).json(await getDataParse(user_id))
        } else {
            console.log("fron db")
            const user = await User.findById(user_id);
            const arrSongID = (await user.populate({ path: "favorites", populate: { path: "artist_Id" } })).favorites
            if (arrSongID.length > 0) {
                await setKey(key, arrSongID)
            }
            res.status(200).json(arrSongID)
        }
    }
    catch (err) {
        next([err.message, 500])
    }

})

module.exports = {
    like,
    update,
    getFavorite
}


