const bcrypt = require("bcrypt")
const User = require("../models/user")
const logger = require("../logger");
const NodeCache = require("node-cache");
const Song = require("../models/song");
const { myCache } = require("./cache")

const like = (async (req, res, next) => {
    try {


        const key = res.locals.id;
        console.log(key)
        const user = await User.findById(key)

        if (!user.favorites.includes(req.params.id)) {
            if (!res.locals.canAdd) {
                console.log(res.locals.canAdd)
                return next(["cant add more", 500])
            }
            await user.updateOne({ $push: { favorites: req.params.id } })

            if (await myCache.exists(key) == 1) {
                let data = await myCache.get(key)
                console.log("like")
                date = data.trim()
                data = JSON.parse(data)
                data.push(Song.findById(req.params.id))

                await myCache.del(key)
                await myCache.set(key, JSON.stringify(data))
            }
            res.status(200).json("the song has been like")

        }
        else {

            await user.updateOne({ $pull: { favorites: req.params.id } })
            if (await myCache.exists(key) == 1) {
                let arr = await myCache.get(key)
                console.log("unlike")
                console.log(arr)
                arr = arr.trim()
                arr = JSON.parse(arr)
                arr.filter(element => element._id != req.params.id)
                await myCache.set(key, JSON.stringify(arr))

            }
            res.status(200).json("the song has been dislike")

        }

    }
    catch (err) {
        console.log(err)
        next([err, 500])
    }
})
const update = (async (req, res, next) => {

    try {
        const user_id = res.locals.id
        console.log(user_id)

        if (!user_id) next(["somthig worng", 500])
        else {
            const user = await User.findByIdAndUpdate(user_id, { $set: req.body, })
            res.status(200).json("update scsusses")
        }
    }
    catch (err) {
        next([err.message, 500])
    }
})

module.exports = {
    like,
    update
}


