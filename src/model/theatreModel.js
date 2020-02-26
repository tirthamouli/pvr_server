/**
 * Theatre model - Contains schema for theatre entity and various methods
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
     * Theatre Model
     */
  class Theatre extends Model {
    /**
         * Check if the city exists
         * @param {String} cityId
         */
    static async checkIfCityExists ({ cityId }) {
      return City.checkIfCityExists({ cityId })
    }

    /**
         * Searches a theatre by name
         * @param {String} name
         */
    static async searchTheatreByName ({ name, limit }) {
      try {
        // Step 1: Get all the theatres with limit
        const theatres = await Theatre.findAll({
          attributes: ['id', 'name'],
          limit: limit,
          order: [['name']],
          where: {
            name: {
              [Op.like]: `${name}%`
            }
          }
        })

        // Step 2: Return the theatres
        return theatres
      } catch (err) {
        throw new InternalServer('not able to search user by name')
      }
    }

    /**
         * Check if theatre exists
         * @param {String} theatreId
         */
    static async checkIfTheatresExists (theatres) {
      try {
        // Step 1: Find using theatre id
        const theatreRes = await Theatre.findAll({
          attributes: ['id'],
          where: {
            id: {
              [Op.in]: theatres
            }
          }
        })

        // Step 2: Check if theatre exists
        if (theatreRes.length === theatres.length) {
          return 'THEATRE_EXISTS'
        }

        // Step 3: Return false because theatre doesn't exist
        return false
      } catch (err) {
        throw new InternalServer('not able to check if user exists')
      }
    }
  }

  // Step 1: Defining the schema and options
  Theatre.init({
    /**
         * id: Primary key
         */
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    /**
         * name - Name of the theatre
         */
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'theatre', // Table name is theatre
    timestamps: true, // Enabling timestamp
    createdAt: 'created', // Created column
    updatedAt: 'updated', // Updated column
    indexes: [
      {
        name: 'name_index',
        fields: ['name']
      }
    ]
  })

  // Step 2: Defining associations
  City.hasMany(Theatre, { foreignKey: 'cityId' })
  Theatre.belongsTo(City, { foreignKey: 'cityId' })

  // Step 3: Return the class
  return Theatre
}

module.exports = init
