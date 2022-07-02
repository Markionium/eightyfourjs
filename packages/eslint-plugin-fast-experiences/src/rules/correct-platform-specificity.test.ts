/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "./correct-platform-specificity";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("correct-platform-specificity", rule, {
  valid: [
    {
      name: ".android.native.ts",
      filename: "index.native.android.ts",
      code: " ",
    },
    {
      name: ".io.native.ts",
      filename: "index.native.ios.ts",
      code: " ",
    },
    {
      name: ".native.ts",
      filename: "index.native.ts",
      code: " ",
    },
  ],

  invalid: [
    {
      name: ".native.android.ts",
      filename: "Incorrect.android.native.ts",
      code: " ",
      errors: [
        {
          message:
            "File appears to have flipped specificity: Incorrect.android.native.ts should be Incorrect.native.android.ts",
          type: "Program",
        },
      ],
    },
    {
      name: ".native.ios.ts",
      filename: "Incorrect.ios.native.ts",
      code: " ",
      errors: [
        {
          message:
            "File appears to have flipped specificity: Incorrect.ios.native.ts should be Incorrect.native.ios.ts",
          type: "Program",
        },
      ],
    },
  ],
});
