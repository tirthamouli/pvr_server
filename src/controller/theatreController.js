/**
 * Theatre controller
 * Author: Tirthamouli Baidya
 */

// Require exceptions
const BadRequest = require("../exception/badRequestException")

// Require helpers
const handleError = require("../helper/handleError")
const { bulkCheckHasOwnProperty } = require("../helper/objectHelper")

class TheatreController {
    /**
     * Dependency injections
     * @param {TheatreService} theatreService - A TheatreService object 
     */
    constructor({ theatreService }) {
        this.theatreService = theatreService
    }

    /**
     * Add route handler
     * @param {Object} req 
     * @param {Object} res 
     */
    async add(req, res) {
        // Step 1: Default response
        let response = {}

        // Step 2: Get the response
        try {
            // Step 2.1: Check if we have the correct request format
            if (!bulkCheckHasOwnProperty({
                obj: req.body,
                propArray: ["name", "cityId"]
            })) {
                throw new BadRequest("bad request")
            }

            // Step 2.2: Pass the request to theatre service
            response = await this.theatreService.add(req.body)

            // Step 2.3: Set the status code
            response.code = 200
            res.status(200)
        } catch (error) {
            // Step 2.1: Handle the error in case of error
            return handleError(error, res)
        }

        // Step 3: Send the response
        res.send(response)
    }

    /**
    * Search route handler
    * @param {Object} req 
    * @param {Object} res 
    */
    async search(req, res) {
        // Step 1: Default response
        let response = {}

        // Step 2: Get the response
        try {
            // Step 2.1: Check if we have the correct request format
            if (!bulkCheckHasOwnProperty({
                obj: req.query,
                propArray: ["value"]
            })) {
                throw new BadRequest("bad request")
            }

            // Step 2.2: Pass the request to the service
            response = await this.theatreService.search({ search: req.query.value })

            // Step 2.3: Set the status code
            response.code = 200
            res.status(200)
        } catch (error) {
            // Step 2.1: Handle the error in case of error
            return handleError(error, res)
        }

        // Step 3: Send the response
        res.send(response)
    }
}
module.exports = TheatreController