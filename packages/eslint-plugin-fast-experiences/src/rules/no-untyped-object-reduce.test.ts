/**
 * @fileoverview Checks if the reduce function is not untyped
 * @author Mark Polak
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "./no-untyped-object-reduce";
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
ruleTester.run("no-untyped-object-reduce", rule, {
  valid: [
    {
      // Type parameter is fine
      code: `[].reduce<Dict>((acc, _) => acc, {}); `,
    },
    {
      // Typed accumulator is fine
      code: `[].reduce((acc: Dict, _) => acc, {});`,
    },
    {
      // Typed init value is fine
      code: `type Dict = { [key in string]?: string }
        [].reduce((acc, _) => acc, {} as Dict);`,
    },
    {
      // Non-object init value is fine

      code: `[].reduce((acc, _) => acc, []);`,
    },
    {
      // Calling reduce on non-array is fine
      code: `({ reduce: () => {} }).reduce((acc, _) => acc, []);`,
    },
  ],

  invalid: [
    {
      code: `[].reduce((acc, cur) => acc, {});`,
      errors: [
        {
          messageId: "unsafe",
          line: 1,
          column: 1,
          endColumn: 33,
        },
      ],
    },
    {
      code: `const arr = [];
        arr.reduce((acc, cur) => acc, {});
        `,
      errors: [
        {
          messageId: "unsafe",
          line: 2,
        },
      ],
    },
  ],
});
