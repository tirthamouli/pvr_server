/**
 * Authenticate JWT Token middleware
 * Author: Tirthamouli Baidya
 */

const { verify } = require("../helper/jwtHelper")
const handleError = require("../helper/handleError")

/**
 * Verify token middleware
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
async function verifyToken(req, res, next) {
    // Step 1: Get the auth header value
    const bearerHeader = req.headers.authorization

    // Step 2: Check if bearer is undefined
    if (typeof bearerHeader === "undefined") {
        // Step 2.1: Forbidden at this point
        res.status(403)
        return res.json({
            status: 403,
            message: "Forbidden"
        })
    }

    // Step 3: Split at space. Token looks like Bearer <access_token>
    const bearer = bearerHeader.split(" ")

    // Step 4: Check if there is a second part
    if (bearer.length < 1) {
        // Step 4.1: Forbidden at this point
        res.status(403)
        return res.json({
            status: 403,
            message: "Forbidden"
        })
    }

    // Step 5: Get the second part
    req.token = bearer[1]

    // Step 6: Verify the token
    try {
        // Step 6.1: Verify the token
        const authData = await verify(req.token)

        // Step 6.2: Set the req
        req.user = authData.user
    } catch (error) {
        // Step 6.1: Incase of error, handle error
        return handleError(error, res)
    }

    // Step 6: Go to next
    next()
}
module.exports = verifyToken