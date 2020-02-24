/**
 * Worker for JSON stringify and parse since they are heavy tasks
 * Author: Tirthamouli Baidya
 */

/* eslint-disable no-prototype-builtins */
(function() {
  /**
   * Parse JSON
   * @param {String} str
   */
  function jsonParse(str) {
    try {
      return self.postMessage({
        error: false,
        value: JSON.parse(str)
      });
    } catch {
      return self.postMessage({
        error: true,
        value: "DATA_ERROR"
      });
    }
  }

  /**
   * Stringify JSON
   * @param {Object} obj
   */
  function jsonStringify(obj) {
    try {
      return self.postMessage({
        error: false,
        value: JSON.stringify(obj)
      });
    } catch {
      return self.postMessage({
        error: true,
        value: "DATA_ERROR"
      });
    }
  }

  /**
   * On message handler
   */
  self.addEventListener("message", function(event) {
    // Step 1: Check if task is found
    if (typeof event.data !== "object" || !event.data.hasOwnProperty("task")) {
      return self.postMessage({
        error: true,
        value: "UNKNOWN_TASK"
      });
    } else if (!event.data.hasOwnProperty("value")) {
      return self.postMessage({
        error: true,
        value: "NO_VALUE"
      });
    }

    // Step 2: Handle task
    switch (event.data.task) {
      case "PARSE":
        jsonParse(event.data.value);
        break;

      case "STRINGIFY":
        jsonStringify(event.data.value);
        break;

      default:
        throw new Error("UNKNOWN_TASK");
    }
  });
})();
