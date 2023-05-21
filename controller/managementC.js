const User = require("../models/user")
const Song = require("../models/song")
const mongoose = require("mongoose")
const mostFavorableSong = async (req, res, next) => {
    try {
        const d = await User.aggregate([{ $unwind: "$favorites" },
        /*  {
  
              $lookup: {
                  from: "songs", localField: "favorites",
                  foreignField: "_id",
                  as: "artist"
              }
          },*/

        {
            $group: {
                _id: "$favorites",
                count: { $sum: 1 },
                // artist: "$artist"


            }
        },

        {

            $lookup: {
                from: "songs", localField: "_id",
                foreignField: "_id",
                as: "song"
            }
        },
        {

            $lookup: {
                from: "artists", localField: "song.artist_Id",
                foreignField: "_id",
                as: "artist"
            }
        },



        { $sort: { count: -1 } },
        ]).limit(3)
        /* const data = await User.find({}).populate({ path: "favorites", populate: { path: "artist_Id" } })
         const d = await User.find({}).populate({ path: "favorites", populate: { path: "artist_Id" } }).then(function (err, data) {
             if (err) {
                 console.log(err);
             } else {
                 data.aggregate({ $unwind: "$favorites" })
             }
 
         })*/



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
                as: "artist"
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
        /*  {
              $filter: {
  
                  song.createdAt: { $eq: 2023 },
  
  
              }
          },*/

        {
            $group: {
                _id: "$song.artist_Id",
                count: { $sum: 1 },



            }
        },





        { $sort: { count: -1 } },
        ]).limit(3)




        res.status(200).json(d)
    } catch (err) {
        next([err, 500])
    }


}

module.exports = {
    mostFavorableSong,
    mostFavorableArtist,
    mostFavorableSongDecade
}