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

    const user_id = res.locals.id
    console.log(user_id)
    try {
        console.log(await myCache.exists(user_id))
        if (await myCache.exists(user_id) == 1) {
            console.log("fron cache")
            let data = await myCache.get(user_id)
            console.log(data)
            data = data.trim()
            console.log(JSON.parse(data)[0])
            res.status(200).json(JSON.parse(data))


        } else {
            console.log("fron db")
            const user = await User.findById(user_id);

            const arrSongID = (await user.populate({ path: "favorites", populate: { path: "artist_Id" } })).favorites

            let arrSong = await Promise.all(
                arrSongID.map((element) => {

                    return Song.findOne({ _id: element })


                })
            )

            if (arrSongID.length > 0) {

                await myCache.set(user_id, JSON.stringify(arrSongID))

            }

            res.status(200).json(arrSongID)
        }
    }
    catch (err) {
        console.log(err)
        next([err.message, 500])
    }

})
const getByArtist = (async (req, res, next) => {
    try {
        const { query } = req;
        const artist = await Artis.findOne({ artis_name: { $regex: query.artisname } })
        const song = await Song.find({ artist_Id: artist._id }).populate("artist_Id")
        res.status(200).json(song);
    }
    catch (err) {
        next([err.message, 500])

    }

})
const addNewSong = (async (req, res, next) => {
    try {
        const song = new Song(req.body)
        await song.save()
        const s = await song.populate("artist_Id");
        res.status(200).json(s)

    }
    catch (err) {
        res.status(500).json("err")
    }



})

module.exports = {
    addNewSong,
    getFavorite,
    getByArtist

}