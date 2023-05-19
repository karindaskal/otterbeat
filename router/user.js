const router = require("express").Router()
const { auth } = require("../middleware/auth")
const { like, update, getFavorite } = require('../controller/userC')
const { canAdd } = require("../middleware/is_premium")

router.put("/:id/like", auth, canAdd, like)
router.put("/", auth, update)
router.get("/favorite", auth, getFavorite)

module.exports = router
