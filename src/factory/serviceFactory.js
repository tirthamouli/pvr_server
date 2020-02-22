/**
 * Service factory for initializing all the services
 * Author: Tirthamouli Baidya
 */

// Services
const AuthService = require("../service/authService")

// Model factory
const modelFactory = require("./modelFactory")

// Export the instances
module.exports = {
    authService: new AuthService({ AuthModel: modelFactory.AuthModel })
}
