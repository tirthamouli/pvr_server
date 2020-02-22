/**
 * Controller factory for initializing all the controller
 * Author: Tirthamouli Baidya
 */

// Services
const AuthController = require("../controller/authController")
const UserController = require("../controller/userController")

// Model factory
const serviceFactory = require("./serviceFactory")

// Export the instances
module.exports = {
    authController: new AuthController({ authService: serviceFactory.authService }),
    userController: new UserController({ userService: serviceFactory.userService })
}
