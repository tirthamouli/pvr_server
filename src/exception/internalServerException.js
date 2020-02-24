/**
 * Internal server error, throw this in a function when there is something wrong with the server working
 * Author: Tirthamouli Baidya
 */

const logger = require("../logger/logger")

class InternalServer extends Error {
    /**
     * 
     * @param {String} message 
     */
    constructor(message) {
        // Step 1: Call the parent constuctor
        super(message)

        // Step 2: Log the error
        logger.error("ERROR 500: " + message)

        // Step 3: Set the name
        this.name = this.constructor.name

        // Step 4: Set the status 
        this.status = 500
    }

    /**
     * Get the status code
     */
    statusCode() {
        return this.status
    }
}

module.exports = InternalServer