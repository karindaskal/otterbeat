const { decodeToken } = require("../utils/jwt");

const auth = (req, res, next) => {
    try {
        console.log("auth")

        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json("no token");
        }

        token = token.split(" ")[1];
        const payload = decodeToken(token)


        console.log(payload.id);
        res.locals.id = payload.id;

        next();
    } catch (error) {
        res.status(401).json("somthing went wrong");
    }



}

module.exports = { auth }