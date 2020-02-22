/**
 * City model - Contains schema for city entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes, Op } = require("sequelize")

/**
 * Initializes the model
 * @param {Object} sequelize 
 */
function init({ sequelize }) {
    /**
     * City Model
     */
    class City extends Model {
        /**
         * Get all the cities
         * @param {String} name
         * @param {Number} limit
         * @param {Number} offset
         */
        static async searchCityByName({ name, limit = 5 }) {
            // Step 1: Get all the cities with limit and offset
            const cities = await City.findAll({
                attributes: ['id', 'name'],
                limit: limit,
                order: [['name']],
                where: {
                    name: {
                        [Op.like]: `${name}%`
                    }
                }
            })

            // Step 2: Return the cities
            return cities
        }

        /**
         * Check if the city exists
         * @param {String} cityId 
         */
        static async checkIfCityExists({ cityId }) {
            // Step 1: Find using city id
            const city = await City.findByPk(cityId)

            // Step 2: Check if city exists
            if (city !== null) {
                return "CITY_EXISTS"
            }

            // Step 3: Return false because city doesn't exists
            return false
        }
    }

    // Step 1: Defining the schema and options
    City.init({
        /**
         * id: Primary key
         */
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        /**
         * name - City name
         */
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        sequelize,
        tableName: 'city', // Table name is user
        timestamps: true, // Enabling timestamp
        createdAt: 'created', // Created column
        updatedAt: 'updated' // Updated column
    })

    // Step 2: Return the class
    return City
}

module.exports = init