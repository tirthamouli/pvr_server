/**
 * Movie service
 * Author: Tirthamouli Baidya
 */

// Validation helper
const validationHelper = require("../helper/validationHelper")

// Exception
const BadRequest = require("../exception/badRequestException")

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
    async add({ name, start, end, theatreId }) {
        // Step 1: Validate and format
        const nameV = validationHelper.movieOrTheatreName(name)
        const startV = validationHelper.dateToMysqlFormat(start)
        const endV = validationHelper.dateToMysqlFormat(end)
        if (!nameV || !startV || !endV) {
            throw new BadRequest("invalid data")
        }

        // Step 2: Check if theatreId is correct
        const theatreExists = await this.TheatreModel.checkIfTheatreExists({ theatreId })
        if (!theatreExists) {
            throw new BadRequest("theatre doesn't exist")
        }

        // Step 3: Create the new movie
        const show = await this.MovieModel.addNewMovie({
            name: nameV,
            startsAt: startV,
            endsAt: endV,
            theatreId
        })

        // Step 4: Return the newly created movie
        return {
            id: show.Movie.id,
            name: name,
            start: start,
            end: end,
            message: "movie added successfully"
        }
    }
}
module.exports = MovieService