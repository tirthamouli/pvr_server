/**
 * User model - Contains schema for user entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes, Deferrable } = require("sequelize")

/**
 * User Model
 */
class User extends Model { }

/**
 * 
 * @param {Object} sequelize 
 * @param {Model} City 
 */
function init({ sequelize, City }) {
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
        },
        /**
         * city_id - Reference to the city of an user
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
        tableName: 'user', // Table name is user
        timestamps: true, // Enabling timestamp
        createdAt: 'created', // Created column
        updatedAt: 'updated' // Updated column
    })

    // Step 2: Return the class
    return User
}

module.exports = init