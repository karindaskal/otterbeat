const User = require("../models/user")
const Song = require("../models/song")
const mongoose = require("mongoose")
const song = require("../models/song")
const mostFavorableSong = async (req, res, next) => {
    try {
        const d = await User.aggregate([{ $unwind: "$favorites" },

        {
            $group: {
                _id: "$favorites",
                count: { $sum: 1 },


            }
        },

        {

            $lookup: {
                from: "songs", localField: "_id",
                foreignField: "_id",
                as: "song",
                pipeline: [{
                    $lookup: {
                        from: "artists", localField: "artist_Id",
                        foreignField: "_id",
                        as: "artist_Id"
                    }
                }
                ]
            }
        },
        { $sort: { count: -1 } },
        ]).limit(3)




        res.status(200).json(d)
    } catch (err) {
        next([err, 500])
    }


}
const mostFavorableArtist = async (req, res, next) => {
    try {
        const d = await User.aggregate([{ $unwind: "$favorites" },
        {

            $lookup: {
                from: "songs", localField: "favorites",
                foreignField: "_id",
                as: "song"
            }
        },

        { $unwind: "$song" },

        {
            $group: {
                _id: "$song.artist_Id",
                count: { $sum: 1 },



            }
        },

        {

            $lookup: {
                from: "artists", localField: "_id",
                foreignField: "_id",
                as: "artist_Id"
            }
        },

        { $sort: { count: -1 } },
        ]).limit(3)
        res.status(200).json(d)
    } catch (err) {
        next([err, 500])
    }


}
const mostFavorableSongDecade = async (req, res, next) => {
    const { query } = req;

    try {
        const d = await User.aggregate(
            [
                { $unwind: "$favorites" },

                {
                    $group: {
                        _id: "$favorites",
                        count: { $sum: 1 }
                    }
                },
                {

                    $lookup: {
                        from: "songs", localField: "_id",
                        foreignField: "_id",
                        as: "songs",
                        /* pipeline: [{
                             $lookup: {
                                 from: "artists", localField: "artist_Id",
                                 foreignField: "_id",
                                 as: "artist"
                             }
                         }
                         ]*/

                    }
                },
                {
                    /*  $match: {
                          "songs.createdAt": { $gte: new Date(query.startYaer), $lt: new Date(query.endYear) }
                      }*/
                    "$match": {
                        "songs.release_year": { $gte: query.startYaer, $lt: query.endYear }

                    }



                },


                {
                    $sort: { count: -1 }
                },

            ]).limit(3)




        res.status(200).json(d)
    } catch (err) {
        next([err, 500])
    }


}
const longestSongs = async (req, res, next) => {
    try {
        const songs = await Song.find().sort({ duration_sec: -1 }).populate("artist_Id").limit(3)
        res.status(200).json(songs)
    } catch (err) {
        next([err, 500])
    }


}
const shortestSongs = async (req, res, next) => {
    try {
        const songs = await Song.find().sort({ duration_sec: 1 }).populate("artist_Id").limit(3)
        res.status(200).json(songs)
    } catch (err) {
        next([err, 500])
    }


}

module.exports = {
    mostFavorableSong,
    mostFavorableArtist,
    mostFavorableSongDecade,
    longestSongs,
    shortestSongs
}