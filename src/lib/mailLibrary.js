/**
 * Library for sending mails 
 */

const nodemailer = require("nodemailer")
const BadRequest = require("../exception/badRequestException")
const InternalServer = require("../exception/internalServerException")

/**
 * A common transporter object which will be used to send mail
 * Need only one object
 * We are maintaining a connection pool to send emails
 */
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
    /**
     * Pool Specifications
     */
    pool: true,
    maxConnections: process.env.EMAIL_MAX_CONNECTIONS
})

/**
 * Send mail function, returns a promise
 * @param {Array} to 
 * @param {String} subject 
 * @param {String} text 
 * @param {String} html 
 */
module.exports = ({ to, subject, text = "", html = "" }) => {
    // Adding a promise wrapper
    return new Promise((resolve, reject) => {
        // Step 1: Create the mail options
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: to,
            subject: subject,
        }

        // Step 2: Check if we need to send text or html
        if (text.trim().length > 0) {
            // When there is text
            mailOptions.text = text.trim()
        } else if (html.trim().length > 0) {
            // When there is html
            mailOptions.html = html.trim()
        } else {
            // When there is no text or html
            return reject(new BadRequest("email has no body"))
        }

        // Step 3: Send the email
        transporter.sendMail(mailOptions, function (error, info) {
            // When there is error
            if (error) {
                return reject(new InternalServer("error while sending mail"))
            }

            // Default when there is no error
            return resolve(info)
        })
    })
}


