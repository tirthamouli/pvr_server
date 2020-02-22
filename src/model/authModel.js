/**
 * Auth model - Contains schema for auth entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes, Deferrable, Op } = require("sequelize")

// Exceptions
const InternalServer = require("../exception/internalServerException")

/**
 * 
 * @param {Object} sequelize 
 * @param {Model} User 
 */
function init({ sequelize, User }) {
    /**
     * Auth Model
     */
    class Auth extends Model {
        /**
         * Register a new user
         * @param {String} firstName
         * @param {String} lastName
         * @param {String} email
         * @param {String} username
         * @param {String} password
         * @param {String} cityId
         */
        static async createNewUser({ firstName, lastName, email, cityId, username, password, }) {
            // Step 1: Start transaction
            const t = await sequelize.transaction()

            // Step 2: Run create queries
            try {
                // Step 2.1: Create new user
                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    cityId
                })

                // Step 2.2: Create new authentication
                const auth = new Auth({
                    username,
                    password,
                    userId: user
                })

                // Step 2.3: Commit
                await t.commit()

                // Step 2.4: Return the user
                return auth
            } catch (err) {
                // Step 2.1: Rollback incase of error
                await t.rollback()

                // Step 2.2: Throw error
                throw new InternalServer(err)
            }
        }

        /**
         * Check if user name or the email exists
         * @param {String} email
         * @param {String} username
         */
        static async checkIfUserExists({ email, username }) {
            try {
                // Step 1: Check if user with username exists
                const auth = await Auth.findOne({
                    attributes: ["id"],
                    where: {
                        username: {
                            [Op.eq]: username
                        }
                    }
                })
                if (auth !== null) {
                    return "USERNAME_EXISTS"
                }

                // Step 2: Check if user with the email exists
                const exists = User.checkIfEmailExists({ email: email })
                if (!exists) {
                    return exists
                }

                // Step 3: Return false if both username and email are available
                return false
            } catch (err) {
                // Step 1: Throw error if any error occurs
                throw new InternalServer(err)
            }
        }

        /**
         * Check if the city exists
         * @param {String} cityId 
         */
        async checkIfCityExists({ cityId }) {
            return await User.checkIfCityExists({ cityId })
        }
    }

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
         * userId - Reference to the user
         */
        userId: {
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