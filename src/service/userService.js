/**
 * User service
 * Author: Tirthamouli Baidya
 */

// Validation helper
const validationHelper = require("../helper/validationHelper")

// Exception
const BadRequest = require("../exception/badRequestException")

/**
 * User service layer
 */
class UserService {
    /**
     * Dependency injection
     * @param {Model} UserModel 
     */
    constructor({ UserModel }) {
        this.UserModel = UserModel
    }

    /**
     * Create a new user
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @param {String} cityId
     */
    async create({ firstName, lastName, email, cityId }) {
        // Step 1: Validate and format
        const firstNameV = validationHelper.name(firstName)
        const lastNameV = validationHelper.name(lastName)
        const emailV = validationHelper.email(email)
        if (!firstNameV || !lastNameV || !emailV || cityId === undefined) {
            throw new BadRequest("invalid data")
        }

        // Step 2: Check if email exists
        const usernameOrEmailExists = await this.UserModel.checkIfEmailExists({ email: emailV })
        if (usernameOrEmailExists !== false) {
            throw new BadRequest(usernameOrEmailExists)
        }

        // Step 3: Check if cityId is correct
        const cityExisits = await this.UserModel.checkIfCityExists({ cityId })
        if (!cityExisits) {
            throw new BadRequest("city doesn't exist")
        }

        // Step 4: Create the new user
        const user = await this.UserModel.create({
            firstName: firstNameV,
            lastName: lastNameV,
            email: emailV,
            cityId
        })

        // Step 5: Return the newly created user
        return {
            id: user.id,
            firstName: firstNameV,
            lastName: lastNameV,
            email: emailV
        }
    }
}
module.exports = UserService