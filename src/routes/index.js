const authRoutes = require('./authRoutes')

/**
 * Use all the routers here
 */
module.exports = app => {
    app.use('/api/auth/', authRoutes)
}
