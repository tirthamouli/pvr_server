/**
 * Initialize all the routers
 * Author: Tirthamouli Baidya
 */

const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const theatreRoutes = require("./theatreRoutes")
const movieRoutes = require("./movieRoutes")


/**
 * Use all the routers here
 */
module.exports = app => {
    app.use('/api/auth/', authRoutes)
    app.use('/api/user/', userRoutes)
    app.use('/api/theatre/', theatreRoutes)
    app.use('/api/movie/', movieRoutes)
}
