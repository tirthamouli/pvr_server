/**
 * Forbidden error, throw this in a function when user doesn't have access
 */
class Forbidden extends Error {
    /**
     * 
     * @param {String} message 
     */
    constructor(message) {
        // Step 1: Call the parent constuctor
        super(message)

        // Step 2: Set the name
        this.name = this.constructor.name

        // Step 3: Set the status 
        this.status = 403
    }

    /**
     * Get the status code
     */
    statusCode() {
        return this.status
    }
}

module.exports = Forbidden