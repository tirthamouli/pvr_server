/**
 * Generates all the tables and populates city
 * Author: Tirthamouli Baidya
 */

// Requiring .env
require("dotenv/config")

// Requiring
const { Sequelize } = require("sequelize")
const cityInit = require("../src/model/cityModel")
const userInit = require("../src/model/userModel")
const theatreInit = require("../src/model/theatreModel")
const authInit = require("../src/model/authModel")
const movieInit = require("../src/model/movieModel")
const { allCities } = require("../src/data/allCities.json")


// Creating a new sequalize pool connection
const sequelize = new Sequelize(process.env.DATABASE_DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    pool: {
        max: 1,
        min: +process.env.DATABASE_MIN_CONNECTION,
        idle: 500
    }
})

// Initializing all the models
const City = cityInit({ sequelize })
const User = userInit({ sequelize, City })
const Theatre = theatreInit({ sequelize, City })
const Auth = authInit({ sequelize, User })
const Movie = movieInit({ sequelize, Theatre })

// Syncing the database
sequelize.sync({ force: true, logging: console.log }).then(async () => {
    // After table creating
    const reqCities = allCities.map(city => {
        return {
            name: city
        }
    })

    // Bulk Insert the city
    await City.bulkCreate(reqCities)

    // Done
    console.log("done")
}).catch((err) => {
    console.log(err)
})

