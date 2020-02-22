/**
 * Auth model - Contains schema for auth entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes, Deferrable } = require("sequelize")

/**
 * Auth Model
 */
class Auth extends Model { }

/**
 * 
 * @param {Object} sequelize 
 * @param {Model} User 
 */
function init({ sequelize, User }) {
    // Step 1: Defining the schema and options
    Auth.init({
        /**
         * id: Primary key
         */
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        /**
         * username - username that the user is going to use
         */
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        /**
         * password - password of the user
         */
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        /**
         * user_id - Reference to the user
         */
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            },
            onDelete: "CASCADE"
        }
    }, {
        sequelize,
        tableName: 'auth', // Table name is auth
        timestamps: true, // Enabling timestamp
        createdAt: 'created', // Created column
        updatedAt: 'updated' // Updated column
    })

    // Step 2: Return the class
    return Auth
}

module.exports = init