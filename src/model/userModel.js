/**
 * User model - Contains schema for user entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes, Op } = require('sequelize')

// Exceptions
const InternalServer = require('../exception/internalServerException')

/**
 *
 * @param {Object} sequelize
 * @param {Model} City
 */
function init ({ sequelize, City }) {
  /**
     * User Model
     */
  class User extends Model {
    /**
         * Check if email exists
         * @param {String} email
         */
    static async checkIfEmailExists ({ email }) {
      try {
        // Step 1: Check if user with the email exists
        const user = await User.findOne({
          attributes: ['id'],
          where: {
            email: {
              [Op.eq]: email
            }
          }
        })
        if (user !== null) {
          return 'email already exists'
        }

        // Return false as user doesn't exist
        return false
      } catch (err) {
        throw new InternalServer('unable to check if email exists')
      }
    }

    /**
         * Check if the city exists
         * @param {String} cityId
         */
    static async checkIfCityExists ({ cityId }) {
      return City.checkIfCityExists({ cityId })
    }

    /**
         * Search for users
         * @param {String} search
         */
    static async searchUserByName ({ search, limit, offset }) {
      try {
        // Step 1: Search user
        const users = await User.findAll({
          attributes: ['id', 'firstName', 'lastName', 'email'],
          limit: limit,
          offset: offset,
          include: [{
            model: City,
            attributes: ['id', 'name']
          }],
          where: {
            [Op.or]: [
              {
                firstName: {
                  [Op.like]: `${search}%`
                }
              },
              {
                lastName: {
                  [Op.like]: `${search}%`
                }
              }
            ]
          },
          order: ['firstName', 'lastName']
        })

        // Step 2: Return user
        return users
      } catch (err) {
        throw new InternalServer('unable to search user by name')
      }
    }

    /**
         * Get emails from ids
         * @param {Array} id
         */
    static async getEmailsFromIds ({ id }) {
      try {
        // Step 1: Check if user with the email exists
        const users = await User.findAll({
          attributes: ['email'],
          where: {
            id: {
              [Op.in]: [id]
            }
          }
        })

        // Return false as user doesn't exist
        return users
      } catch (err) {
        // Throw error when there is error
        throw new InternalServer('unable to get emails from ids')
      }
    }

    /**
         * Search a city by name
         * @param {String} name
         * @param {Number} limit
         */
    static async searchCityByName ({ name, limit = 5 }) {
      return City.searchCityByName({ name, limit })
    }
  }

  // Step 1: Defining the schema and options
  User.init({
    /**
         * id: Primary key
         */
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    /**
         * firstName - First name of the user
         */
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    /**
         * lastName - Last name of the user
         */
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    /**
         * email - Email of the user
         */
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    tableName: 'user', // Table name is user
    timestamps: true, // Enabling timestamp
    createdAt: 'created', // Created column
    updatedAt: 'updated', // Updated column
    indexes: [
      {
        name: 'first_name_index',
        fields: ['firstName']
      },
      {
        name: 'last_name_index',
        fields: ['lastName']
      }
    ]
  })

  // Step 2: Difining associations
  User.belongsTo(City, { foreignKey: 'cityId' })
  City.hasMany(User, { foreignKey: 'cityId' })

  // Step 3: Return the class
  return User
}

module.exports = init
