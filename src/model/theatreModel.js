/**
 * Theatre model - Contains schema for theatre entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes, Deferrable } = require("sequelize")

/**
 * Theatre Model
 */
class Theatre extends Model { }

/**
 * 
 * @param {Object} sequelize 
 * @param {Model} City 
 */
function init({ sequelize, City }) {
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
        updatedAt: 'updated' // Updated column
    })

    // Step 2: Defining associations
    City.hasMany(Theatre, { foreignKey: 'cityId' })

    // Step 3: Return the class
    return Theatre
}

module.exports = init