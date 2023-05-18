const User = require("../models/user")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const logger = require("../logger");
const { error } = require("winston");
require('dotenv').config();
const register = (async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10)
        if (req.body.password.length < 6) {
            next(["invalid password", 403])
        }
        else if (req.body.user_name.length < 1) {
            next(["user name can't be emptey,403"])
        }
        else {
            await bcrypt.hash(req.body.password, salt, async (err, hash) => {
                if (err) {
                    next([err, 500])
                }
                else {
                    try {
                        const user = new User({
                            user_name: req.body.user_name,
                            email: req.body.email,
                            password: hash,
                        })
                        await user.save();

                        res.status(200).json(user)
                    }
                    catch (err) {
                        next([err, 500])

                    }
                }

            })
        }
    }
    catch (err) {


        next([err, 500])

    }
})
const login = (async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        await bcrypt.compare(req.body.password, user.password, (err, isValid) => {
            if (err) {
                console.log(err)
                next([err, 500]);
            }
            else if (!isValid) {
                next(["worng password", 404])
            }
            else {
                const token = jwt.sign(
                    { id: user.id },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                )
                user.token = token;
                res.status(200).json(user)
            }
        })


    }
    catch (err) {
        console.log(err)
        next([err, 500])
    }
})

module.exports = {
    login,
    register
}