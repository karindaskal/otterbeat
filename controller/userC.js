const bcrypt = require("bcrypt")
const User = require("../models/user")
const logger = require("../logger");
const NodeCache = require("node-cache");
const Song = require("../models/song");
const { myCache } = require("./cache")

const like = (async (req, res, next) => {
    try {
        const key = req.body.id
        console.log(key)


        const user = await User.findById(req.body.id)

        if (!user.favorites.includes(req.params.id)) {
            await user.updateOne({ $push: { favorites: req.params.id } })
            if (await myCache.exists(key) == 1) {
                let data = await myCache.get(key)
                console.log("like")
                date = data.trim()
                data = JSON.parse(data)
                data.push(Song.findById(req.params.id))
                console.log(data)


                await myCache.del(key)

                await myCache.set(key, JSON.stringify(data))
            }



            res.status(200).json("the song has been like")

        }
        else {

            await user.updateOne({ $pull: { favorites: req.params.id } })
            if (await myCache.exists(req.body.id) == 1) {
                let arr = await myCache.get(req.body.id)
                console.log("unlike")
                console.log(arr)
                arr = arr.trim()
                arr = JSON.parse(arr)
                arr.filter(element => element._id != req.params.id)

                await myCache.set(req.body.id, JSON.stringify(arr))

            }
            res.status(200).json("the song has been dislike")

        }

    }
    catch (err) {
        next([err.message, 500])
    }
})
const update = (async (req, res, next) => {

    try {
        if (!req.body._id) next(["no id on body", 500])
        else if (!req.params.id) next(["no id on param", 500])
        else if (req.body._id === req.params.id) {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body, })
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


