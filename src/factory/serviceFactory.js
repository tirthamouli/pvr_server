/**
 * Service factory for initializing all the services
 * Author: Tirthamouli Baidya
 */

// Services
const AuthService = require('../service/authService')
const UserService = require('../service/userService')
const TheatreService = require('../service/theatreService')
const MovieService = require('../service/movieService')

// Model factory
const modelFactory = require('./modelFactory')

// Export the instances
module.exports = {
  authService: new AuthService({ AuthModel: modelFactory.AuthModel }),
  userService: new UserService({ UserModel: modelFactory.UserModel }),
  theatreService: new TheatreService({ TheatreModel: modelFactory.TheatreModel }),
  movieService: new MovieService({ MovieModel: modelFactory.MovieModel })
}
