/**
 * Entry point for the project 
 * Author: Tirthamouli
 */

const express = require("express")
const routes = require("./src/routes/index")

// Initializing defaults
const app = express()
const server = require("http").createServer(app)

// Listening to http port
const httpPort = process.env.HTTP_PORT || 5000
server.listen(httpPort, () => {
    console.log("HTTP Server is running on port: " + httpPort)
})

// Route handling
routes(app)