const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')


/**
 * Use all the routers here
 */
module.exports = app => {
    app.use('/api/auth/', authRoutes)
    app.use('/api/user/', userRoutes)
}
