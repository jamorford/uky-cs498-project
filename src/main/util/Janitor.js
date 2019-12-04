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
    // Only accept primitives
    if (input instanceof Object || input == null) {
      return null;
    }

    try {
      return this.toStringHandler(input);
    } catch (err) {
      // Handle conversion error
      console.error(err.message);
      return null;
    }
  }

  static sanitizeInt(input) {
    // Only accept primitives
    if (input instanceof Object || input == null) {
      return null;
    }

    try {
      const output = this.parseIntHandler(input);

      // Return null if conversion failed (NaN)
      if (isNaN(output)) {
        return null;
      }

      return output;
    } catch (err) {
      // Handle conversion error
      console.error(err.message);
      return null;
    }
  }

  static sanitizeIntPostgres(input) {
    const cleanInt = Janitor.sanitizeInt(input);
    if (cleanInt == null) {
      return null;
    }

    const max_postgres_int = Math.pow(2, 31);
    if (cleanInt >= (-1)*max_postgres_int && cleanInt < max_postgres_int) {
      return cleanInt;
    } else {
      return null;
    }
  }
}
module.exports = Janitor;
