/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "./no-data-retrieving-from-ui-component";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
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
          message: "Don't retrieve data from a presentation component",
        },
      ],
    },
  ],
});
