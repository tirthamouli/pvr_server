/**
 * Model factory - For initializing all the models using mysql dialect
 * Author: Tirthamouli Baidya
 */

const { Sequelize } = require('sequelize')
const cityInit = require('../model/cityModel')
const userInit = require('../model/userModel')
const theatreInit = require('../model/theatreModel')
const authInit = require('../model/authModel')
const movieInit = require('../model/movieModel')

// For logging
const logger = require('../logger/logger')

// Creating a new sequalize pool connection
const sequelize = new Sequelize(process.env.DATABASE_DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  logging: logger.info.bind(logger),
  pool: {
    max: +process.env.DATABASE_MAX_CONNECTION,
    min: +process.env.DATABASE_MIN_CONNECTION,
    idle: +process.env.DATABASE_CONNECTION_IDLE_TIME * 1000
  }
})

// Initializing all the models
const City = cityInit({ sequelize })
const User = userInit({ sequelize, City })
const Auth = authInit({ sequelize, User })
const Theatre = theatreInit({ sequelize, City })
const Movie = movieInit({ sequelize, Theatre })

// Exporting all the modules
module.exports = {
  CityModel: City,
  UserModel: User,
  AuthModel: Auth,
  TheatreModel: Theatre,
  MovieModel: Movie
}
