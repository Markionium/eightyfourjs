"use strict";

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json", "./packages/*/tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "@2js/eslint-plugin-rules-for-rules"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:node/recommended",
  ],
  rules: {
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-missing-import": [
      "error",
      {
        tryExtensions: [".ts", ".json", ".node"],
      },
    ],
    "@2js/rules-for-rules/lint-rule-name": "error",
  },
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.ts"],
      env: { mocha: true },
    },
  ],
};
