const Song = require('../models/song')
const Artis = require('../models/artist');
/*const getAllSong = async (req, res, next) => {
    try {
        const songs = await Song.find().populate("artist_Id");
        res.status(200).json(songs);
    } catch (err) {
        next([err.message, 500])
    }
}*/

const getByArtist = (async (req, res, next) => {
    try {
        const { query } = req;


        if (Object.keys(query).length > 0) {
            const name = new RegExp(query.artisname, "i");

            const artist = await Artis.find({ artis_name: { $regex: name } })

            if (!artist) {
                res.status(200).json([]);
            }

            // const song = await Promise.all(
            //     artist.map(async (a) => {
            //         //  console.log(await Song.find({ artist_Id: a._id }).populate("artist_Id"))

            //         const s= await Song.find({ artist_Id: a._id }).populate("artist_Id")
            //         return s.map((s)=>{
            //             return s
            //         })


            //     }))
            const id = artist.map((a) => {
                return a._id
            })
            const song = await Song.find({ artist_Id: id }).populate("artist_Id")
            res.status(200).json(song);
        }

        else {

            const songs = await Song.find().populate("artist_Id");
            res.status(200).json(songs);
        }


    }
    catch (err) {
        next([err, 500])

    }

})
const addNewSong = (async (req, res, next) => {
    try {
        const sec = stringToSec(req.body.duration)
        req.body.duration_sec = sec
        const song = new Song(req.body)
        await song.save()
        const s = await song.populate("artist_Id");
        res.status(200).json(s)

    }
    catch (err) {
        next([err, 500])
    }



})
const deleteSong = async (req, res, next) => {

    try {
        await
            Song.findByIdAndDelete(req.params.id)
        res.status(200).json("the song has been deleted")
    } catch (err) {
        next([err, 500])
    }

}
const stringToSec = (hms) => {
    var a = hms.split(':');
    var seconds
    if (a.length == 1) {
        seconds = parseInt(a[0])

    }
    else if (a.length == 2) {
        seconds = (+a[0]) * 60 + (+a[1]);

    }
    else {
        seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    }


    return seconds


}


module.exports = {
    deleteSong,
    addNewSong,
    getByArtist,
    //  getAllSong

}