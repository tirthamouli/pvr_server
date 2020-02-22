/**
 * Validation helper
 * Author: Tirthamouli Baidya
 */

const { hash } = require('./bcryptHelper')

/**
 * Regex patterns for validation
 */
const patterns = {
    name: /^[a-z]{3,}$/i,
    username: /^[a-z0-9_]{3,}$/,
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
        return typeof value === 'string'
    },
    /**
     * Sanitize and format a name
     * @param {String} value
     */
    name(value) {
        return this.simpleString(value) && patterns.name.test(value.trim()) ? value.trim() : false
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
    },
    /**
     * Sanitize and format an integer
     * @param {Number} value
     */
    integer(value) {
        return isNaN(value) ? false : parseInt(value)
    },
}