/**
 * Movie service
 * Author: Tirthamouli Baidya
 */

// Validation helper
const validationHelper = require("../helper/validationHelper")

// Exception
const BadRequest = require("../exception/badRequestException")

/**
 * Verifying and mapping shows
 * @param {Array} shows
 * @param {Model} MovieModel 
 */
async function showVerifier(shows, MovieModel) {
    // Step 1: Checking if show is an array
    if (shows.constructor.name !== 'Array') {
        return false
    }

    // Step 2: Mapping value
    const res = []
    const theatreIdArray = []
    const idCheck = {}
    for (let i = 0; i < shows.length; i++) {
        // Step 2.1: Validate
        const startV = validationHelper.dateToMysqlFormat(shows[i].start)
        const endV = validationHelper.dateToMysqlFormat(shows[i].end)
        if (!startV || !endV) {
            return false
        }

        // Step 2.2: Check if we have already inserted the theatre id - Preventing multi inserts
        if (idCheck.hasOwnProperty(shows[i].theatreId)) {
            continue
        }
        idCheck[shows[i].theatreId] = true

        // Step 2.3: Push in res
        res.push({
            startsAt: startV,
            endsAt: endV,
            TheatreId: shows[i].theatreId
        })

        // Step 2.4: Push in theatreIdArray
        theatreIdArray.push(shows[i].theatreId)
    }
    // Step 3: Check if all theatre ids exists
    const theatresExists = await MovieModel.checkIfTheatresExists(theatreIdArray)
    if (!theatresExists) {
        return false
    }

    // Step 4: Return the res
    return res
}

/**
 * Movie service layer
 */
class MovieService {
    /**
     * Dependency injection
     * @param {Model} MovieModel 
     */
    constructor({ MovieModel }) {
        this.MovieModel = MovieModel
    }

    /**
     * Add a new movie
     * @param {String} firstName
     * @param {String} start
     * @param {String} end
     * @param {String} theatreId
     */
    async add({ name, description, shows }) {
        // Step 1: Validate and format
        const nameV = validationHelper.movieOrTheatreName(name)
        const descriptionV = validationHelper.description(description)
        const showsV = await showVerifier(shows, this.MovieModel)
        if (!nameV || !descriptionV || !showsV) {
            throw new BadRequest("invalid data")
        }

        // Step 2: Create the new movie
        const movie = await this.MovieModel.addNewMovie({
            name: nameV,
            description: descriptionV,
            values: showsV
        })

        // Step 3: Return the newly created movie
        return {
            movie: {
                id: movie.id,
                name: name,
                description: descriptionV
            },
            message: "movie added successfully"
        }
    }

    /**
     * Search a movie by name
     * @param {String} search 
     */
    async search({ search }) {
        // Step 1: Validate and format
        const searchV = validationHelper.simpleStringCheck(search)

        // Step 2: Get the result
        const movies = await this.MovieModel.searchMovieByName({ name: searchV, limit: 15 })

        // Step 3: Format response
        const movieRes = movies.map(movie => {
            return {
                id: movie.id,
                name: movie.name,
                description: movie.description
            }
        })

        // Step 4: Return the res
        return {
            movies: movieRes
        }
    }
}
module.exports = MovieService