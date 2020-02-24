/**
 * Movie model - Contains schema for movie entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes, Op, QueryTypes } = require("sequelize")

// Exceptions
const InternalServer = require("../exception/internalServerException")

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
         * Check if all the theatres exists
         * @param {Array} theatres 
         */
        static async checkIfTheatresExists(theatres) {
            return await Theatre.checkIfTheatresExists(theatres)
        }

        /**
         * Search for movies by name
         * @param {String} name 
         * @param {Number} limit 
         */
        static async searchMovieByName({ name, limit = 15, offset = 0 }) {
            try {
                // Step 1: Get all the cities with limit and offset
                const movies = await Movie.findAll({
                    attributes: ["id", "name", "description"],
                    limit: limit,
                    offset: offset,
                    order: [["name"]],
                    where: {
                        name: {
                            [Op.like]: `${name}%`
                        }
                    }
                })

                // Step 2: Return the cities
                return movies
            } catch (err) {
                throw new InternalServer("unable to search movie by name")
            }
        }

        /**
         * Get movie by id
         * @param {String} movieId 
         */
        static async getMovieById({ movieId }) {
            try {
                // Step 1: Find the movie
                const movie = await Movie.findByPk(movieId)

                // Step 2: Return the movie
                return movie
            } catch (err) {
                // Throw error if any
                throw new InternalServer("unable to get movie by id")
            }
        }

        /**
         * Get users from movie
         * @param {String} movieId 
         */
        static async getUsersForMovie({ movieId }) {
            try {
                // Step 1: Run raw query
                const emails = await sequelize.query(
                    "SELECT DISTINCT u.email as email FROM user u LEFT JOIN auth a ON (a.userId = u.id) INNER JOIN city c ON (u.cityId = c.id) INNER JOIN theatre t ON (t.cityId = c.id) INNER JOIN `show` s ON (s.TheatreId = t.id AND s.startsAt <= CURDATE() AND s.endsAt >= CURDATE()) INNER JOIN movie m ON (m.id = s.MovieId AND m.id = :movieId) WHERE a.id is NULL",
                    {
                        replacements: { movieId: movieId },
                        type: QueryTypes.SELECT
                    }
                );

                // Step 2: Return result
                return emails
            } catch (err) {
                // Throw in case of errors
                throw new InternalServer("unable to get email for movies")
            }
        }

        /**
         * Add a new movie and create corresponding shows
         * @param {String} name
         * @param {String} description
         * @param {Array} values
         */
        static async addNewMovie({ name, description, values }) {
            // Step 1: Start transaction
            const t = await sequelize.transaction()

            // Step 2: Run create queries
            try {
                // Step 2.1: Create new movie
                const movie = await Movie.create({
                    name,
                    description
                })

                // Step 2.2: Create new shows
                await Show.bulkCreate(values.map(value => {
                    return {
                        ...value,
                        MovieId: movie.id
                    }
                }))

                // Step 2.3: Commit
                await t.commit()

                // Step 2.4: Return the show
                return movie
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
        /**
         * description - Description of the movie
         */
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: "movie", // Table name is movie
        timestamps: true, // Enabling timestamp
        createdAt: "created", // Created column
        updatedAt: "updated", // Updated column
        indexes: [
            {
                name: "name_index",
                fields: ["name"],
            }
        ]
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
        tableName: "show", // Table name is movie
        timestamps: true, // Enabling timestamp
        createdAt: "created", // Created column
        updatedAt: "updated" // Updated column
    })

    // Step 3: Define association
    Movie.belongsToMany(Theatre, { through: Show })
    Theatre.belongsToMany(Movie, { through: Show })

    // Step 4: Return the class
    return Movie
}

module.exports = init