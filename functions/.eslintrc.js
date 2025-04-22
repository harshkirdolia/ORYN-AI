module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true, // Added browser support, if applicable
  },
  parserOptions: {
    ecmaVersion: 2022, // Updated ECMAScript version for modern JS features
    sourceType: "module", // Ensure support for modules if you're using imports/exports
  },
  extends: [
    "eslint:recommended", // Basic set of rules
    "google", // Google style guide
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"], // Restricting common globals
    "prefer-arrow-callback": "error", // Prefer arrow functions for callbacks
    "quotes": ["error", "double", { "allowTemplateLiterals": true }], // Enforce double quotes
    "object-curly-spacing": ["error", "never"], // No spaces after `{` or before `}`
    "max-len": ["error", { "code": 80 }], // Enforce max line length of 80 characters
    "eol-last": ["error", "always"], // Ensure newline at the end of files
    "no-trailing-spaces": "error", // No trailing spaces allowed
  },
  overrides: [
    {
      files: ["**/*.spec.*"], // Target test files
      env: {
        mocha: true, // Mocha testing environment
      },
      rules: {
        // Add any specific Mocha-related rules if needed
      },
    },
  ],
  globals: {
    // Add any global variables here that may be used across your project
    // e.g., "myGlobalVariable": "readonly"
  },
};