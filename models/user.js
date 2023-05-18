const mongoose = require("mongoose")
const UserSecm = new mongoose.Schema({
    user_name: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 20,


    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    profile_picture: {
        type: String,
        default: ""
    },


    is_premium: {
        type: Boolean,
        default: false

    },
    favorites: {
        type: Array,
        default: []
    },



},
    { timestamps: true });
module.exports = mongoose.model("user", UserSecm)