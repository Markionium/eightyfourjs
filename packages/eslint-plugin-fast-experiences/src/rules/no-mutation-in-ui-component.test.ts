/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "./no-mutation-in-ui-component";
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
ruleTester.run("no-mutation-in-ui-component", rule, {
  valid: [
    {
      filename: "something.ts",
      code: "useMutate();",
      options: [],
    },

    {
      filename: "lpc-something-data.ts",
      code: "useMutate();",
    },

    {
      filename: "lpc-something.ts",
      code: "useMutate();",
    },
  ],

  invalid: [
    {
      filename: "lpc-something-ui.ts",
      code: "useMutate();",
      errors: [
        {
          messageId: "failure",
        },
      ],
    },
  ],
});
