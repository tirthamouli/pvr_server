/**
 * Controller factory for initializing all the controller
 * Author: Tirthamouli Baidya
 */

// Services
const AuthController = require("../controller/authController")

// Model factory
const serviceFactory = require("./serviceFactory")

// Export the instances
module.exports = {
    authController: new AuthController({ authService: serviceFactory.authService })
}
