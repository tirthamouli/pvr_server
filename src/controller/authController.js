/**
 * Author: Tirthamouli Baidya
 */

// Require exceptions
const BadRequest = require("../exception/badRequestException")

// Require helpers
const handleError = require("../helper/handleError")
const { bulkCheckHasOwnProperty } = require("../helper/objectHelper")

/**
 * Auth Controller has methods for handling auth resquests
 */
class AuthController {
    /**
     * Dependency injections
     * @param {AuthService} authService - An AuthService object 
     */
    constructor({ authService }) {
        this.authService = authService
    }

    /**
     * Login controller
     * @param {Object} req 
     * @param {Object} res 
     */
    async login(req, res) {
        // Step 1: Default response
        let response = {}

        // Step 2: Get the response
        try {
            // Step 2.1: Check if we have the correct request format
            if (!bulkCheckHasOwnProperty({
                obj: req.body,
                propArray: ['username', 'password']
            })) {
                throw new BadRequest("bad request")
            }

            // Step 2.2: Pass the request to auth service
            response = await this.authService.login(req.body)

            // Step 2.3: Set the status code
            response.code = 200
            res.status(200)
        } catch (error) {
            // Step 2.1: Handle the error in case of error
            response = handleError(error, res)
        }

        // Step 3: Send the response
        res.send(response)
    }

    /**
     * Register controller
     * @param {Object} req 
     * @param {Object} res 
     */
    async register(req, res) {
        // Step 1: Default response
        let response = {}

        // Step 2: Get the response
        try {
            // Step 2.1: Check if we have the correct request format
            if (!bulkCheckHasOwnProperty({
                obj: req.body,
                propArray: ['firstName', 'lastName', 'email', 'username', 'password', 'repeatPassword']
            })) {
                throw new BadRequest("bad request")
            }

            // Step 2.2: Pass the request to auth service
            response = await this.authService.register(req.body)

            // Step 2.3: Set the status code
            response.code = 200
            res.status(200)
        } catch (error) {
            // Step 2.1: Handle the error in case of error
            response = handleError(error, res)
        }

        // Step 3: Send the response
        res.send(response)
    }
}
