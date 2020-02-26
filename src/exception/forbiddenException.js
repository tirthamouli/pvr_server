/**
 * Forbidden error, throw this in a function when user doesn't have access
 * Author: Tirthamouli Baidya
 */

const logger = require('../logger/logger')

class Forbidden extends Error {
  /**
     *
     * @param {String} message
     */
  constructor (message) {
    // Step 1: Call the parent constuctor
    super(message)

    // Step 2: Log the error
    logger.error('ERROR 403: ' + message)

    // Step 3: Set the name
    this.name = this.constructor.name

    // Step 4: Set the status
    this.status = 403
  }

  /**
     * Get the status code
     */
  statusCode () {
    return this.status
  }
}

module.exports = Forbidden
