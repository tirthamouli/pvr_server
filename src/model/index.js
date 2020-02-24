const { Sequelize, QueryTypes } = require('sequelize')
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
    // // const res = await City.searchCityByName({ limit: 1, name: "va" })
    // const movie = await Movie.findOne({
    //     include: [{
    //         model: Theatre,
    //         attributes: ['id'],
    //         include: [{
    //             model: City,
    //             attributes: ['id'],
    //             include: [{
    //                 model: User
    //             }]
    //         }]
    //     }],
    //     where: {
    //         id: {
    //             [Op.eq]: '2d62bc3f-3789-49fc-8389-23b5fb5e4d88'
    //         }
    //     }
    // })
    const user = await sequelize.query(
        "SELECT DISTINCT u.email as email FROM user u INNER JOIN city c ON u.cityId = c.id INNER JOIN theatre t ON (t.cityId = c.id) INNER JOIN `show` s ON (s.TheatreId = t.id AND s.startsAt <= CURDATE() AND s.endsAt >= CURDATE()) INNER JOIN movie m ON (m.id = s.MovieId AND m.id = :movieId)",
        {
            replacements: { movieId: '2d62bc3f-3789-49fc-8389-23b5fb5e4d88' },
            type: QueryTypes.SELECT
        }
    );
    console.log(user)

}

callm()


// sequelize.sync({ alter: true, logging: console.log }).then(async () => {
//     console.log("Done")

// }).catch((err) => {
//     console.log(err)
// })

