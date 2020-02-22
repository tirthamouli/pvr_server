const { Sequelize } = require('sequelize')
const cityInit = require("./cityModel")
const userInit = require("./userModel")
const theatreInit = require("./theatreModel")
const authInit = require("./authModel")
const movieInit = require("./movieModel")
const { allCities } = require("../data/allCities.json")


const sequelize = new Sequelize('pvr', 'tirthamouli', 'YY35vYdPyzrSDWHspubJfwtJB6aSUQMeBGpK95SA', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

const City = cityInit({ sequelize })
const User = userInit({ sequelize, City })
const Theatre = theatreInit({ sequelize, City })
const Auth = authInit({ sequelize, User })
const Movie = movieInit({ sequelize, Theatre })


async function callm() {
    const res = await City.searchCityByName({ limit: 30, name: "va" })
    console.log(res)
}

callm()


// sequelize.sync({ alter: true, logging: console.log }).then(async () => {
//     // const allCityObject = allCities.map(city => {
//     //     return {
//     //         name: city
//     //     }
//     // })
//     // for (let i = 0; i < allCityObject.length; i++) {
//     //     City.create(allCityObject[i]).then((res) => {
//     //         console.log(res)
//     //     })
//     // }

// }).catch((err) => {
//     console.log(err)
// })

