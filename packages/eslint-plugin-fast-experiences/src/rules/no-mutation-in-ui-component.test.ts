/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "./no-mutation-in-ui-component";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-mutation-in-ui-component", rule, {
  valid: [
    {
      filename: "something.ts",
      code: "useMutate();",
      options: [
        {
          bannedFunctions: ["useMutate"],
          exclude: "lpc-.*-ui.*$",
          message: "Don't mutate data from a presentation component",
        },
      ],
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
          message: "Don't mutate data from a presentation component",
        },
      ],
    },
  ],
});
