/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "./no-data-retrieving-from-ui-component";
import { ESLintUtils } from "@typescript-eslint/utils";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});
ruleTester.run("no-data-retrieving-from-ui-component", rule, {
  valid: [
    {
      filename: "something.ts.lint",
      code: "useFetch();",
    },

    {
      filename: "lpc-something-data.ts",
      code: "useFetch();",
    },

    {
      filename: "lpc-something.ts",
      code: "useFetch();",
    },
  ],

  invalid: [
    {
      filename: "lpc-something-ui.ts",
      code: "useFetch();",
      errors: [
        {
          messageId: "failure",
        },
      ],
    },
  ],
});
