/**
 * Authentication service
 * Author: Tirthamouli Baidya
 */

// Validation helper
const validationHelper = require("../helper/validationHelper")

// Exception
const BadRequest = require("../exception/badRequestException")
const Forbidden = require("../exception/forbiddenException")

// JWT helper
const { sign } = require("../helper/jwtHelper")
// Bcrypt helper
const { compare } = require("../helper/bcryptHelper")

class AuthService {
    /**
     * Dependency injection
     * @param {Model} AuthModel 
     */
    constructor({ AuthModel }) {
        this.AuthModel = AuthModel
    }

    /**
     * Register a new user
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @param {String} username
     * @param {String} password
     * @param {String} repeatPassword
     * @param {String} cityId
     */
    async register({ firstName, lastName, email, username, password, repeatPassword, cityId }) {
        // Step 1: Validate and format
        const firstNameV = validationHelper.name(firstName)
        const lastNameV = validationHelper.name(lastName)
        const emailV = validationHelper.email(email)
        const usernameV = validationHelper.username(username)
        const passwordV = await validationHelper.password(password, repeatPassword)
        if (!firstNameV || !lastNameV || !emailV || !usernameV || !passwordV || cityId === undefined) {
            throw new BadRequest("invalid data")
        }


        // Step 2: Check if username or email exists
        const usernameOrEmailExists = await this.AuthModel.checkIfUserExists({ email: emailV, username: usernameV })
        if (usernameOrEmailExists !== false) {
            throw new BadRequest(usernameOrEmailExists)
        }

        // Step 3: Check if cityId is correct
        const cityExisits = await this.AuthModel.checkIfCityExists({ cityId })
        if (!cityExisits) {
            throw new BadRequest("city doesn't exist")
        }


        // Step 4: Create new user
        const user = await this.AuthModel.createNewUser({
            firstName: firstNameV,
            lastName: lastNameV,
            email: emailV,
            cityId: cityId,
            username: usernameV,
            password: passwordV
        })

        // Step 5: Create new JWT token
        const token = await sign({
            id: user.id,
            email: emailV,
            username: usernameV,
            firstName: firstNameV,
            lastName: lastNameV
        })

        // Step 6: Return the response
        return {
            token,
            message: 'registration successfull'
        }
    }

    /**
     * Login an exisiting user
     * @param {String} username
     * @param {String} password
     */
    async login({ username, password }) {
        // Step 1: Get user data from username
        const user = await this.AuthModel.getUserByUsername({ username })

        // Step 2: Verify if there is an user
        if (user === null) {
            throw new Forbidden('user does not exist')
        }

        // Step 3: Verify password
        const passwordVerification = await compare(password, user.password)
        if (!passwordVerification) {
            throw new Forbidden('incorrect password')
        }

        // Step 4: Create new JWT token
        const token = await sign({
            id: user.id,
            email: user.User.email,
            username: username,
            firstName: user.User.firstName,
            lastName: user.User.lastName
        })

        // Step 5: Return the response
        return {
            token,
            message: 'login successfull'
        }
    }
}

module.exports = AuthService