import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        ...globals.node,
        require: true,
        module: true,
        process: true,
        exports: true,
      },
    },
    rules: {
      quotes: ["error", "double"],
      "no-unused-vars": "warn",
      "max-len": "off",
      "object-curly-spacing": "off",
      "eol-last": "off",
      "no-trailing-spaces": "off",
    },
  },
];