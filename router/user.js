const router = require("express").Router()
const { auth } = require("../middleware/auth")
const { like, update, getFavorite } = require('../controller/userC')
const { canAdd } = require("../middleware/is_premium")
router.use(auth)
router.put("/:id/like", canAdd, like)
router.put("/", update)
router.get("/favorite", getFavorite)

module.exports = router
