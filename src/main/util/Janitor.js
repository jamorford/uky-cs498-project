class Janitor {
    // Handler is used to enable test stubbing and 100% code coverage
    static toStringHandler(input) {
        return input.toString();
    }

    // Handler is used to enable test stubbing  and 100% code coverage
    static parseIntHandler(input) {
        return parseInt(input);
    }

    static sanitizeString(input) {
        // Only accept primatives
        if (input instanceof Object || input == null) {
            return null
        }

        try {
            return this.toStringHandler(input)
        } catch (err) {
            // Handle conversion error
            console.error(err.message)
            return null
        }   
    }

    static sanitizeInt(input) {
        // Only accept primatives
        if (input instanceof Object || input == null) {
            return null
        }

        try {
            var output = this.parseIntHandler(input)

            // Return null if conversion failed (NaN)
            if (isNaN(output)) {
                return null
            }

            return output
        } catch (err) {
            // Handle conversion error
            console.error(err.message)
            return null
        }    
    }
}
module.exports = Janitor