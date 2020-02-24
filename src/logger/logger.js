/**
 * Logger for loggin
 * Author: Tirthamouli
 */

const winston = require("winston")
require("winston-daily-rotate-file")

// Step 1: Define transport options
const transport = new (winston.transports.DailyRotateFile)({
    filename: "./logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "15d",
    handleExceptions: true
})

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        transport
    ]
})

module.exports = logger
