const User = require("../models/user")
async function canAdd(req, res, next) {
    try {

        const user = await User.findById(res.locals.id)
        if (user.is_premium || user.favorites.length < 5) {
            res.locals.canAdd = true;

        }
        else {
            res.locals.canAdd = false;

        }
        next()

    }
    catch (err) {
        console.log(err)
        next([err, 500])
    }


}
module.exports = {
    canAdd
}