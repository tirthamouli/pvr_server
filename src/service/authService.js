const validationHelper = require("../helper/validationHelper")

/**
 * Authentication service
 * Author: Tirthamouli Baidya
 */

class AuthService {
    /**
     * Dependency injection
     * @param {Model} authModel 
     */
    constructor({ authModel }) {
        this.authModel = authModel
    }

    /**
     * 
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @param {String} username
     * @param {String} password
     * @param {String} repeatPassword
     */
    async register({ firstName, lastName, email, username, password, repeatPassword }) {
        // Step 1: Validate and format
        const firstNameV = validationHelper.name(firstName)
        const lastNameV = validationHelper.name(lastName)
        const emailV = validationHelper.email(email)
        const usernameV = validationHelper.username(username)
        const passwordV = await validationHelper.password(password, repeatPassword)

        // Step 2: Check if username or email exists
    }
}

module.exports = AuthService