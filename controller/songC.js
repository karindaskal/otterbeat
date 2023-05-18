const Song = require('../models/song')
const Artis = require('../models/artist');
const User = require("../models/user");

const logger = require("../logger");

//const myCache = new NodeCache({ stdTTL: 10 });
const { myCache } = require("./cache")
//const { createClient } = require('redis');
//const RedisPort = 6379
//const myCache = createClient(RedisPort);
myCache.on('error', err => console.log('Redis Client Error', err));
myCache.connect();



const getFavorite = (async (req, res, next) => {

    try {
        console.log(await myCache.exists(req.params.id))
        if (await myCache.exists(req.params.id) == 1) {
            console.log("fron cache")
            let data = await myCache.get(req.params.id)
            console.log(data)
            data = data.trim()
            console.log(JSON.parse(data)[0])
            res.status(200).json(JSON.parse(data))


        } else {
            console.log("fron db")
            const user = await User.findById(req.params.id);
            const arrSongID = user.favorites
            const arrSong = await Promise.all(
                arrSongID.map((element) => {
                    return Song.find({ _id: element })
                })
            )
            if (arrSong.length > 0) {
                await myCache.set(req.params.id, JSON.stringify(arrSong))
            }
            res.status(200).json(arrSong)
        }
    }
    catch (err) {
        next([err.message, 500])
    }

})
const getByArtist = (async (req, res, next) => {
    try {

        const artist = await Artis.findOne({ artis_name: { $regex: req.params.artisname } })
        const song = await Song.find({ artist_Id: artist._id })
        res.status(200).json(song);
    }
    catch (err) {
        next([err.message, 500])

    }

})

module.exports = {
    getFavorite,
    getByArtist

}