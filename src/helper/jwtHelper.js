/**
 * JWT Helper
 * Author: Tirthamouli Baidya
 */

const jwt = require('jsonwebtoken')

// Exception
const InternalServer = require('../exception/internalServerException')
const Forbidden = require('../exception/forbiddenException')

/**
 * Sign a JWT Token
 * @param {Object} user
 */
function sign (user) {
  // Step 1: Promise wrapper
  return new Promise((resolve, reject) => {
    // Step 2: Sign using async method
    jwt.sign({ user }, process.env.JWT_SECRET, {
      algorithm: 'HS512',
      expiresIn: '1d'
    }, (err, token) => {
      // Step 3: Check for any errors
      if (err) {
        reject(new InternalServer('unable to sign jwt token'))
      }

      // Step 4: Resolve the data
      resolve(token)
    })
  })
}

/**
 * Verify a JWT Token
 * @param {Object} user
 */
function verify (token) {
  // Step 1: Promise wrapper
  return new Promise((resolve, reject) => {
    // Step 2: Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
      // Step 3: In case of error, token is incorrect
      if (err) {
        reject(new Forbidden('invalid token'))
      }

      // Step 4: Resolve the data
      resolve(authData)
    })
  })
}

// Exporting modules
module.exports = {
  sign,
  verify
}
