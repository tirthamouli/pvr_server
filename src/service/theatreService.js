/**
 * Theatre service
 * Author: Tirthamouli Baidya
 */

// Validation helper
const validationHelper = require('../helper/validationHelper')

// Exception
const BadRequest = require('../exception/badRequestException')

/**
 * Theatre service layer
 */
class TheatreService {
  /**
     * Dependency injection
     * @param {Model} TheatreModel
     */
  constructor ({ TheatreModel }) {
    this.TheatreModel = TheatreModel
  }

  /**
     * Add a new theatre
     * @param {String} firstName
     * @param {String} lastName
     * @param {String} email
     * @param {String} cityId
     */
  async add ({ name, cityId }) {
    // Step 1: Validate and format
    const nameV = validationHelper.movieOrTheatreName(name)
    if (!nameV) {
      throw new BadRequest('invalid data')
    }

    // Step 2: Check if cityId is correct
    const cityExisits = await this.TheatreModel.checkIfCityExists({ cityId })
    if (!cityExisits) {
      throw new BadRequest("city doesn't exist")
    }

    // Step 3: Create the new theatre
    const theatre = await this.TheatreModel.create({
      name: nameV,
      cityId
    })

    // Step 4: Return the newly created theatre
    return {
      theatre: {
        id: theatre.id,
        name: nameV
      },
      message: 'theatre created successfully'
    }
  }

  /**
     * Search a theatre by name
     * @param {String} search
     */
  async search ({ search }) {
    // Step 1: Validate and format
    const searchV = validationHelper.simpleStringCheck(search)
    if (searchV === false) {
      throw new BadRequest('invalid data')
    }

    // Step 2: Get the result
    const theatres = await this.TheatreModel.searchTheatreByName({ name: searchV, limit: 5 })

    // Step 3: Format response
    const theatreRes = theatres.map(theatre => {
      return {
        id: theatre.id,
        name: theatre.name
      }
    })

    // Step 4: Return the res
    return {
      theatres: theatreRes
    }
  }
}
module.exports = TheatreService
