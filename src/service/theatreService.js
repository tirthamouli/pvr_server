/**
 * Theatre service
 * Author: Tirthamouli Baidya
 */

// Validation helper
const validationHelper = require("../helper/validationHelper")

// Exception
const BadRequest = require("../exception/badRequestException")

/**
 * Theatre service layer
 */
class TheatreService {
    /**
     * Dependency injection
     * @param {Model} TheatreModel 
     */
    constructor({ TheatreModel }) {
        this.TheatreModel = TheatreModel
    }

    /**
     * Add a new theatre
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @param {String} cityId
     */
    async add({ name, cityId }) {
        // Step 1: Validate and format
        const nameV = validationHelper.movieOrTheatreName(name)
        if (!nameV) {
            throw new BadRequest("invalid data")
        }

        // Step 2: Check if cityId is correct
        const cityExisits = await this.TheatreModel.checkIfCityExists({ cityId })
        if (!cityExisits) {
            throw new BadRequest("city doesn't exist")
        }

        // Step 3: Create the new theatre
        const theatre = await this.TheatreModel.create({
            name: nameV,
            cityId
        })

        // Step 4: Return the newly created theatre
        return {
            id: theatre.id,
            name: nameV,
            message: "theatre created successfully"
        }
    }
}
module.exports = TheatreService