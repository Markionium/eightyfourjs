/**
 * @fileoverview Checks if the reduce function is not untyped
 * @author Mark Polak
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "./lint-rule-name";
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
ruleTester.run("lint-rule-name", rule, {
  valid: [
    {
      filename:
        "eslint-plugin-fast-experiences/src/rules/no-untyped-object-reduce.ts",
      code: `
      const rule = createRule<Options, MessageIds>({
        name: "no-untyped-object-reduce",
      });
      `,
    },
  ],

  invalid: [
    {
      filename:
        "eslint-plugin-fast-experiences/src/rules/no-untyped-object-reduce.ts",
      code: `
      const rule = createRule<Options, MessageIds>({
        name: "no-untyped-object-reduced",
      });
      `,
      errors: [
        {
          messageId: "wrongName",
          line: 3,
        },
      ],
    },
    {
      filename:
        "eslint-plugin-fast-experiences/src/rules/no-untyped-object-reduce.ts",
      code: `
      const rule = createRule<Options, MessageIds>({
        name: "",
      });
      `,
      errors: [
        {
          messageId: "wrongName",
          line: 3,
        },
      ],
    },
  ],
});
