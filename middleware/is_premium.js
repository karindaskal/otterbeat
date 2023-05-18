const User = require("../models/user")
async function canAdd(req, res, next) {
    try {
        const user = await User.findById(req.body.id)
        if (user.is_premium || user.favorites.length < 5) {
            next()
        }
        else
            res.status(200).json("you cant add more song")
    }
    catch (err) {
        next([err, 500])
    }


}
module.exports = {
    canAdd
}