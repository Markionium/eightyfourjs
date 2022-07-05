/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "./correct-platform-specificity";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

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
          messageId: "failure",
          data: {
            fileName: "Incorrect.android.native.ts",
            fixed: "Incorrect.native.android.ts",
          },
          type: AST_NODE_TYPES.Program,
        },
      ],
    },
    {
      name: ".native.ios.ts",
      filename: "Incorrect.ios.native.ts",
      code: " ",
      errors: [
        {
          messageId: "failure",
          data: {
            fileName: " Incorrect.ios.native.ts",
            fixed: "Incorrect.native.ios.ts",
          },
          type: AST_NODE_TYPES.Program,
        },
      ],
    },
  ],
});
