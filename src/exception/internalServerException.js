/**
 * Internal server error, throw this in a function when there is something wrong with the server working
 */
class InternalServer extends Error {
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