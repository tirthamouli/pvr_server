/**
 * Movie model - Contains schema for movie entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes } = require("sequelize")

/**
 * 
 * @param {Object} sequelize 
 * @param {Model} Theatre 
 */
function init({ sequelize, Theatre }) {
    /**
     * Movie Model
     */
    class Movie extends Model {
        /**
         * Check if theatre exists
         * @param {String} theatreId 
         */
        static async checkIfTheatreExists({ theatreId }) {
            return await Theatre.checkIfTheatreExists({ theatreId })
        }

        /**
         * Add a new movie
         * @param {String} name
         * @param {String} startsAt
         * @param {String} endsAt
         * @param {String} theatreId
         */
        static async addNewMovie({ name, startsAt, endsAt, theatreId }) {
            // Step 1: Start transaction
            const t = await sequelize.transaction()

            // Step 2: Run create queries
            try {
                // Step 2.1: Create new movie
                const movie = await Movie.create({
                    name
                })

                // Step 2.2: Create new show
                const show = await Show.create({
                    startsAt,
                    endsAt,
                    MovieId: movie.id,
                    TheatreId: theatreId
                })

                // Step 2.3: Commit
                await t.commit()

                // Step 2.4: Return the show
                return show
            } catch (err) {
                // Step 2.1: Rollback incase of error
                await t.rollback()

                // Step 2.2: Throw error
                throw new InternalServer("unable to create new movie")
            }
        }
    }

    /**
     * Show Model - pivot table
     */
    class Show extends Model { }

    // Step 1: Defining the schema and options
    Movie.init({
        /**
         * id: Primary key
         */
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        /**
         * name - Name of the movie
         */
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'movie', // Table name is movie
        timestamps: true, // Enabling timestamp
        createdAt: 'created', // Created column
        updatedAt: 'updated' // Updated column
    })

    // Step 2: Initialize the pivot table
    Show.init({
        /**
         * id: Primary key
         */
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        /**
         * start - Start date of the movie
         */
        startsAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        /**
         * end - End date of the movie
         */
        endsAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'show', // Table name is movie
        timestamps: true, // Enabling timestamp
        createdAt: 'created', // Created column
        updatedAt: 'updated' // Updated column
    })

    // Step 3: Define association
    Movie.belongsToMany(Theatre, { through: Show })
    Theatre.belongsToMany(Movie, { through: Show })

    // Step 4: Return the class
    return Movie
}

module.exports = init