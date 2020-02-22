/**
 * Service factory for initializing all the services
 * Author: Tirthamouli Baidya
 */

// Services
const AuthService = require("../service/authService")
const UserService = require("../service/userService")

// Model factory
const modelFactory = require("./modelFactory")

// Export the instances
module.exports = {
    authService: new AuthService({ AuthModel: modelFactory.AuthModel }),
    userService: new UserService({ UserModel: modelFactory.UserModel })
}
