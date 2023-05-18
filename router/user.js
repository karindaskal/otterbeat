const router = require("express").Router()

const { like, update } = require('../controller/userC')
const { canAdd } = require("../middleware/is_premium")

router.put("/:id/like", canAdd, like)
router.put("/:id", update)

module.exports = router
