/**
 * Validation helper
 * Author: Tirthamouli Baidya
 */

const { hash } = require("./bcryptHelper")

// XSS prevention
const xss = require("xss")

/**
 * First need to create a formatting function to pad numbers to two digits for datetime conversion
 **/
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

/**
 * Regex patterns for validation
 */
const patterns = {
    name: /^[a-z]{3,}$/i,
    username: /^[a-z0-9_]{3,}$/i,
    theatreName: /^[a-z0-9_+\-': ]+$/i,
    email: /^([a-z0-9\.-_%+]+)@([a-z0-9-]+)\.([a-z]{2,10})(\.[a-z]{2,5})?$/i,
    password: /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/
}

/**
 * Exporting the validation functions
 */
module.exports = {
    /**
     * Check if value is of type string
     * @param {String} value 
     */
    simpleString(value) {
        return typeof value === "string"
    },
    /**
     * Check weater number is int
     * @param {Number} value 
     */
    intCheck(value) {
        return isNaN(value) ? false : parseInt(value)
    },
    /**
     * Sanitize and format a name
     * @param {String} value
     */
    name(value) {
        return this.simpleString(value) && patterns.name.test(value.trim()) ? value.trim() : false
    },
    /**
     * Simple string check
     * @param {String} value 
     */
    simpleStringCheck(value) {
        return this.simpleString(value) ? value.trim() : false
    },
    /**
     * Check if theatre name is valid
     * @param {String} value 
     */
    movieOrTheatreName(value) {
        return this.simpleString(value) && patterns.theatreName.test(value.trim()) ? value.trim() : false
    },
    /**
     * Sanitize and format an username
     * @param {String} value 
     */
    username(value) {
        return this.simpleString(value) && patterns.username.test(value.trim()) ? value.trim() : false
    },
    /**
     * Sanitize and format email
     * @param {String} value 
     */
    email(value) {
        return this.simpleString(value) && patterns.email.test(value.trim()) ? value.trim() : false
    },
    /**
     * Check if it is a valid description
     * @param {String} value 
     */
    description(value) {
        return this.simpleString(value) ? xss(value.trim()) : false
    },
    /**
     * Converts jsDate to myslq date
     * @param {String} jsDate 
     */
    dateToMysqlFormat(jsDate) {
        // Step 1: Get JS Date
        const date = new Date(jsDate)

        // Step 2: Check if date is valid
        if (isNaN(date.getTime())) {
            // Date is invalid
            return false
        }

        // Step 3: Convert to mysql date
        return date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth()) + "-" + twoDigits(date.getUTCDate()) + " " + twoDigits(date.getUTCHours()) + ":" + twoDigits(date.getUTCMinutes()) + ":" + twoDigits(date.getUTCSeconds());
    },
    /**
     * Sanitize and format password
     * @param {String} password 
     * @param {String} repeatPassword 
     */
    async password(password, repeatPassword) {
        // Step 1: Check if password is equal to repeat password
        if (!this.simpleString(password) || password !== repeatPassword) {
            return false
        }

        // Step 2: Check if password is having correct regex
        if (!patterns.password.test(password)) {
            return false
        }

        // Step 3: Hash the password
        const hashedPassword = await hash(password)

        // Step 4: Return hash
        return hashedPassword
    }
}