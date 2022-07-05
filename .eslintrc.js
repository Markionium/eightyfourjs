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
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:node/recommended",
    "plugin:@2js/rules-for-rules/recommended",
  ],
  rules: {
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-missing-import": [
      "error",
      {
        tryExtensions: [".ts", ".json", ".node"],
      },
    ],
    "node/shebang": [
      "error",
      {
        convertPath: {
          "src/**/*.ts": ["^src/(.+?)\\.ts$", "lib/$1.js"],
        },
      },
    ],
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
