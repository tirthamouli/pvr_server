module.exports = {
    /**
     * Check if the given properties are in the array
     * @param {Object} obj 
     * @param {Array} propArray 
     */
    bulkCheckHasOwnProperty({ obj, propArray }) {
        // Step 1: Default valid
        let valid = true

        // Step 2: Loop through all the keys and check if they are in the array
        for (let i = 0; i < propArray.length; i++) {
            if (!obj.hasOwnProperty(propArray[i])) {
                // Break at any point if key is not found
                valid = false
                break
            }
        }

        // Step 3: Return if valid or not
        return valid
    }
}