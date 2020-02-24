/**
 * Initialize all the routers
 * Author: Tirthamouli Baidya
 */

const authRoutes = require("./authRoutes")
const userRoutes = require("./userRoutes")
const theatreRoutes = require("./theatreRoutes")
const movieRoutes = require("./movieRoutes")
const express = require("express");
const path = require("path");



/**
 * Use all the routers here
 */
module.exports = app => {
    app.use("/api/auth/", authRoutes)
    app.use("/api/user/", userRoutes)
    app.use("/api/theatre/", theatreRoutes)
    app.use("/api/movie/", movieRoutes)

    // Static folder
    app.use(express.static("dist"));

    // Default route
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "/../../dist/index.html"));
    });
}
