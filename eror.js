const logger = require("./logger");
async function error(err, req, res, next) {
    logger.error(err[0])

    res.status(err[1]).json(err[0])

}
module.exports = {
    error
}