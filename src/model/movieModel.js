/**
 * Movie model - Contains schema for movie entity and various methods
 * Author: Tirthamouli Baidya
 */

const { Model, DataTypes } = require("sequelize")

/**
 * Movie Model
 */
class Movie extends Model { }

/**
 * Show Model - pivot table
 */
class Show extends Model { }

/**
 * 
 * @param {Object} sequelize 
 * @param {Model} Theatre 
 */
function init({ sequelize, Theatre }) {
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