/**
 * Handling user routes here
 * Author: Tirthamouli Baidya
 */

const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// Authentication middleware
const verifyToken = require("../middleware/verifyAuthMiddleware")

// Getting auth controller from the controller factory
const userController =
    require('../factory/controllerFactory').userController

// Using middlewares - json parser, verifyToken
router.use(bodyParser.json())
router.use(verifyToken)

/**
 * Login route
 */
router.post('/create',
    userController.create.bind(userController)
)

module.exports = router
