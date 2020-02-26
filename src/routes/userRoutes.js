/**
 * Handling user routes here
 * Author: Tirthamouli Baidya
 */

const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// Authentication middleware
const verifyToken = require('../middleware/verifyAuthMiddleware')

// Getting user controller from the controller factory
const userController =
    require('../factory/controllerFactory').userController

// Using middlewares - json parser, verifyToken
router.use(bodyParser.json())

/**
 * Create route
 */
router.post('/create', verifyToken,
  userController.create.bind(userController)
)

/**
 * Search route
 */
router.get('/search', verifyToken,
  userController.search.bind(userController)
)

/**
 * Send mail route
 */
router.post('/mail', verifyToken,
  userController.sendMail.bind(userController)
)

/**
 * Search city route
 */
router.get('/city/search',
  userController.searchCity.bind(userController)
)

module.exports = router
