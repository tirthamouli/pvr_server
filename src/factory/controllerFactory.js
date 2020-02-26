/**
 * Controller factory for initializing all the controller
 * Author: Tirthamouli Baidya
 */

// Services
const AuthController = require('../controller/authController')
const UserController = require('../controller/userController')
const TheatreController = require('../controller/theatreController')
const MovieController = require('../controller/movieController')

// Model factory
const serviceFactory = require('./serviceFactory')

// Export the instances
module.exports = {
  authController: new AuthController({ authService: serviceFactory.authService }),
  userController: new UserController({ userService: serviceFactory.userService }),
  theatreController: new TheatreController({ theatreService: serviceFactory.theatreService }),
  movieController: new MovieController({ movieService: serviceFactory.movieService })
}
