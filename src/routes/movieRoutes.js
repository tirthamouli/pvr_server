/**
 * Handling movie routes here
 * Author: Tirthamouli Baidya
 */

const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// Authentication middleware
const verifyToken = require('../middleware/verifyAuthMiddleware')

// Getting movie controller from the controller factory
const movieController =
    require('../factory/controllerFactory').movieController

// Using middlewares - json parser, verifyToken
router.use(bodyParser.json())
router.use(verifyToken)

/**
 * Login route
 */
router.post('/add',
  movieController.add.bind(movieController)
)

/**
 * Search route
 */
router.get('/search',
  movieController.search.bind(movieController)
)

/**
 * Send mail route
 */
router.post('/mail',
  movieController.sendMail.bind(movieController)
)

module.exports = router
