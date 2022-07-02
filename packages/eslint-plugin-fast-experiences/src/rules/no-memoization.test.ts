/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "./no-memoization";
import { ESLintUtils } from "@typescript-eslint/utils";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});
ruleTester.run("no-memoization", rule, {
  valid: [
    {
      code: "transform(() => undefined);",
    },
  ],

  invalid: [
    {
      code: `import { memo } from "react"; 

memo(() => undefined);`,
      errors: [
        {
          messageId: "noMemoize",
        },
      ],
    },
    {
      code: "React.memo(() => undefined)",
      errors: [
        {
          messageId: "noMemoize",
        },
      ],
    },
    {
      code: "memoizeFunction(() => undefined);",
      errors: [
        {
          messageId: "noMemoize",
        },
      ],
    },
  ],
});
