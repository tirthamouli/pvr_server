/**
 * User model - Contains schema for user entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes, Deferrable, Op } = require("sequelize")

// Exceptions
const InternalServer = require("../exception/internalServerException")


/**
 * 
 * @param {Object} sequelize 
 * @param {Model} City 
 */
function init({ sequelize, City }) {
    /**
     * User Model
     */
    class User extends Model {
        /**
         * Check if email exists
         * @param {String} email 
         */
        static async checkIfEmailExists({ email }) {
            try {
                // Step 1: Check if user with the email exists
                const user = await User.findOne({
                    attributes: ["id"],
                    where: {
                        email: {
                            [Op.eq]: email
                        }
                    }
                })
                if (user !== null) {
                    return "EMAIL_EXISTS"
                }

                // Return false as user doesn't exist
                return false
            } catch (err) {
                throw new InternalServer("unable to check if email exists")
            }
        }

        /**
         * Check if the city exists
         * @param {String} cityId 
         */
        static async checkIfCityExists({ cityId }) {
            return await City.checkIfCityExists({ cityId })
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
        },
        /**
         * cityId - Reference to the city of an user
         */
        cityId: {
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