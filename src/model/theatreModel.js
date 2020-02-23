/**
 * Theatre model - Contains schema for theatre entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes, Op } = require("sequelize")

/**
 * 
 * @param {Object} sequelize 
 * @param {Model} City 
 */
function init({ sequelize, City }) {
    /**
     * Theatre Model
     */
    class Theatre extends Model {
        /**
         * Check if the city exists
         * @param {String} cityId 
         */
        static async checkIfCityExists({ cityId }) {
            return await City.checkIfCityExists({ cityId })
        }

        /**
         * Check if theatre exists
         * @param {String} theatreId 
         */
        static async checkIfTheatresExists(theatres) {
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
                return "THEATRE_EXISTS"
            }

            // Step 3: Return false because theatre doesn't exist
            return false
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
                fields: ['name'],
            }
        ]
    })

    // Step 2: Defining associations
    City.hasMany(Theatre, { foreignKey: 'cityId' })

    // Step 3: Return the class
    return Theatre
}

module.exports = init