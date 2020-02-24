/**
 * Handling theatre routes here
 * Author: Tirthamouli Baidya
 */

const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()

// Authentication middleware
const verifyToken = require("../middleware/verifyAuthMiddleware")

// Getting theatre controller from the controller factory
const theatreController =
    require("../factory/controllerFactory").theatreController

// Using middlewares - json parser, verifyToken
router.use(bodyParser.json())
router.use(verifyToken)

/**
 * Login route
 */
router.post("/add",
    theatreController.add.bind(theatreController)
)

/**
 * Search route
 */
router.get("/search",
    theatreController.search.bind(theatreController)
)


module.exports = router
