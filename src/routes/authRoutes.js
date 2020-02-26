/**
 * Handling auth routes here
 * Author: Tirthamouli Baidya
 */

const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// Authentication middleware
const verifyToken = require('../middleware/verifyAuthMiddleware')

// Getting auth controller from the controller factory
const authController =
    require('../factory/controllerFactory').authController

// Using middlewares - json parser
router.use(bodyParser.json())

/**
 * Login route
 */
router.post('/login',
  authController.login.bind(authController)
)

/**
 * Register a new user
 */
router.post('/register',
  authController.register.bind(authController)
)

/**
 * Verify if the user is authentic
 */
router.get('/verify', verifyToken,
  authController.verify.bind(authController)
)
module.exports = router
