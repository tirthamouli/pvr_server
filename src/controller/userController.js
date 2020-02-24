/**
 * User controller
 * Author: Tirthamouli Baidya
 */

// Require exceptions
const BadRequest = require("../exception/badRequestException")

// Require helpers
const handleError = require("../helper/handleError")
const { bulkCheckHasOwnProperty } = require("../helper/objectHelper")

class UserController {
    /**
     * Dependency injections
     * @param {UserService} userService - An UserService object 
     */
    constructor({ userService }) {
        this.userService = userService
    }

    /**
     * Create route handler
     * @param {Object} req 
     * @param {Object} res 
     */
    async create(req, res) {
        // Step 1: Default response
        let response = {}

        // Step 2: Get the response
        try {
            // Step 2.1: Check if we have the correct request format
            if (!bulkCheckHasOwnProperty({
                obj: req.body,
                propArray: ["firstName", "lastName", "email", "cityId"]
            })) {
                throw new BadRequest("bad request")
            }

            // Step 2.2: Pass the request to auth service
            response = await this.userService.create(req.body)

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
     * Get route handler
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

            // Step 2.2: Pass the request to user service
            response = await this.userService.search(req.query)

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
     * Search city handler
     * @param {Object} req 
     * @param {Object} res 
     */
    async searchCity(req, res) {
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

            // Step 2.2: Pass the request to user service
            response = await this.userService.searchCity({ search: req.query.value })

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
     * Send mail route
     * @param {Object} req 
     * @param {Object} res 
     */
    async sendMail(req, res) {
        // Step 1: Default response
        let response = {}

        // Step 2: Get the response
        try {
            // Step 2.1: Check if we have the correct request format
            if (!bulkCheckHasOwnProperty({
                obj: req.body,
                propArray: ["id", "title", "body"]
            })) {
                throw new BadRequest("bad request")
            }

            // Step 2.2: Pass the request to auth service
            response = await this.userService.sendMail(req.body)

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
module.exports = UserController