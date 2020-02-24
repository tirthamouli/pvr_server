/**
 * Bcrypt helper
 * Author: Tirthamouli Baidya
 */
const bcrypt = require("bcrypt")
const InternalServer = require("../exception/internalServerException")

/**
 * Hash a password using bcrypt
 * @param {String} password 
*/
function hash(password) {
    // Step 1: Create a promise wrapper
    return new Promise((resolve, reject) => {
        // Step 2: Hash the password
        bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUNDS, function (err, hashedPassword) {
            // Step 3: Incase of any error, throw a new error
            if (err) {
                return reject(new InternalServer("error during hash"))
            }

            // Step 4: Resolve when there is no error
            resolve(hashedPassword)
        })
    })
}

/**
 * Compare password and hash
 * @param {String} password 
 * @param {String} hash 
 */
function compare(password, hash) {
    // Step 1: Create a promise wrapper
    return new Promise(resolve => {
        // Step 2: Compare the password
        bcrypt.compare(password, hash, function (err, result) {
            // Step 3: Incase of any error, throw a new error
            if (err) {
                return reject(new InternalServer("error during hash"))
            }

            // Step 4: Resolve when there is no error - True or false result
            resolve(result)
        })
    })
}

module.exports = {
    hash,
    compare
}