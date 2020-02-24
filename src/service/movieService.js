/**
 * Movie service
 * Author: Tirthamouli Baidya
 */

// Validation helper
const validationHelper = require("../helper/validationHelper")

// Exception
const BadRequest = require("../exception/badRequestException")

// Email library
const sendMail = require("../lib/mailLibrary")

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
        if (searchV === false) {
            throw new BadRequest("invalid data")
        }

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

    /**
     * Send mail notifying about movie
     * @param {String} movieId 
     */
    async sendMail({ movieId }) {
        // Step 1: Get movie name and description from id and check if it exists
        const movie = await this.MovieModel.getMovieById({ movieId })
        if (movie === null) {
            throw new BadRequest("invalid data")
        }

        // Step 2: Get all the user email
        const users = await this.MovieModel.getUsersForMovie({ movieId })

        // Step 3: Generate the email array
        const emailArr = users.map(user => {
            return user.email
        })

        // Step 4: Generate some random title, incase of a real project we should create a template for the message
        const title = `${movie.name} now in your city!!`
        const body =
            `${movie.name} is now in your city.
            Want to know about '${movie.description}'?
            PVRCinema in your city is now plaing ${movie.name}.
            Watch today!!`

        // Step 5: Send the mail
        await sendMail({
            to: emailArr,
            subject: title,
            text: body
        })

        // Step 6: Return the res
        return {
            message: 'Email successfully sent'
        }
    }
}
module.exports = MovieService