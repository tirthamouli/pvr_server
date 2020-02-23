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
    if (typeof shows !== 'array') {
        return false
    }

    // Step 2: Mapping value
    let res = []
    let theatreIdArray = []
    for (let i = 0; i < shows.length; i++) {
        // Step 2.1: Validate
        const startV = validationHelper.dateToMysqlFormat(show[i].start)
        const endV = validationHelper.dateToMysqlFormat(show[i].end)
        if (!startV || !endV) {
            return false
        }

        // Step 2.2: Push in res
        res.push({
            startsAt: startV,
            endsAt: endV,
            TheatreId: show[i].theatreId
        })

        // Step 2.3: Push in theatreIdArray
        theatreIdArray.push(show[i].theatreId)
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
        const showsV = await showVerifier(shows)
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
            id: movie.id,
            name: name,
            message: "movie added successfully"
        }
    }
}
module.exports = MovieService