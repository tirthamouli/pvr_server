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
        },
        /**
         * city_id - Reference to the city of the theatre
         */
        city_id: {
            type: DataTypes.UUID,
            references: {
                model: City,
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            },
            onDelete: "CASCADE"
        }
    }, {
        sequelize,
        tableName: 'theatre', // Table name is theatre
        timestamps: true, // Enabling timestamp
        createdAt: 'created', // Created column
        updatedAt: 'updated' // Updated column
    })

    // Step 2: Return the class
    return Theatre
}

module.exports = init