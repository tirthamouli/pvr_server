/**
 * User service
 * Author: Tirthamouli Baidya
 */

// Validation helper
const validationHelper = require('../helper/validationHelper')

// Exception
const BadRequest = require('../exception/badRequestException')

// Email library
const sendMail = require('../lib/mailLibrary')

/**
 * User service layer
 */
class UserService {
  /**
     * Dependency injection
     * @param {Model} UserModel
     */
  constructor ({ UserModel }) {
    this.UserModel = UserModel
  }

  /**
     * Create a new user
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @param {String} cityId
     */
  async create ({ firstName, lastName, email, cityId }) {
    // Step 1: Validate and format
    const firstNameV = validationHelper.name(firstName)
    const lastNameV = validationHelper.name(lastName)
    const emailV = validationHelper.email(email)
    if (!firstNameV || !lastNameV || !emailV || cityId === undefined) {
      throw new BadRequest('invalid data')
    }

    // Step 2: Check if email exists
    const usernameOrEmailExists = await this.UserModel.checkIfEmailExists({ email: emailV })
    if (usernameOrEmailExists !== false) {
      throw new BadRequest(usernameOrEmailExists)
    }

    // Step 3: Check if cityId is correct
    const cityName = await this.UserModel.checkIfCityExists({ cityId })
    if (!cityName) {
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
      user: {
        id: user.id,
        firstName: firstNameV,
        lastName: lastNameV,
        email: emailV,
        city: cityName
      },
      message: 'user created successfully'
    }
  }

  /**
     * Search for user by name
     * @param {String} search
     * @param {Number} page
     */
  async search ({ value = '', page = 0 }) {
    // Step 1: Validate and format
    const searchV = validationHelper.simpleStringCheck(value)
    const pageV = validationHelper.intCheck(page)
    if (searchV === false || pageV === false) {
      throw new BadRequest('invalid data')
    }

    // Step 2: Get the result
    const users = await this.UserModel.searchUserByName({ search: searchV, limit: 10, offset: 10 * pageV })

    // Step 3: Format response
    const userRes = users.map(user => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        city: user.City.name
      }
    })

    // Step 4: Return the res
    return {
      users: userRes
    }
  }

  /**
     * Search for city by name
     * @param {String} search
     */
  async searchCity ({ search }) {
    // Step 1: Validate and format
    const searchV = validationHelper.simpleStringCheck(search)
    if (searchV === false) {
      throw new BadRequest('invalid data')
    }

    // Step 2: Get the result
    const cities = await this.UserModel.searchCityByName({ name: searchV, limit: 5 })

    // Step 3: Format response
    const cityRes = cities.map(city => {
      return {
        id: city.id,
        name: city.name
      }
    })

    // Step 4: Return the res
    return {
      cities: cityRes
    }
  }

  /**
     * Send mail to the user
     * @param {String} id
     * @param {String} title
     * @param {String} body
     */
  async sendMail ({ id, title, body }) {
    // Step 1: Validate data
    const titleV = validationHelper.movieOrTheatreName(title)
    const bodyV = validationHelper.description(body)
    if (!titleV || !bodyV || id.constructor.name !== 'Array') {
      throw new BadRequest('invalid data')
    }

    // Step 2: Get emails from ids
    const users = await this.UserModel.getEmailsFromIds({ id: id })

    // Step 3: Get email array
    const emailArr = users.map(user => {
      return user.email
    })

    // Step 4: Check if email array is empty
    if (emailArr.length !== id.length) {
      throw new BadRequest('Invalid id sent')
    }

    // Step 5: Send the mail
    await sendMail({
      to: emailArr,
      subject: titleV,
      text: body
    })

    // Step 6: Send response
    return {
      message: 'mail successfully sent'
    }
  }
}
module.exports = UserService
