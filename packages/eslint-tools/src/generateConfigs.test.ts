import { describe, expect, it } from "@jest/globals";
import { generateConfigs } from "./generateConfigs";
import { TSESLint } from "@typescript-eslint/utils";

describe("generateConfigs", () => {
  it("returns the correct recommended config", () => {
    const packageInfo = {
      name: "@eightyfourjs/eslint-plugin-rules-for-rules",
      version: "1.0.0",
      description: "Lint rules for writing lint rules",
    };
    const rules: [string, TSESLint.RuleModule<"wrongName">][] = [
      [
        "lint-rule-name",
        {
          meta: {
            type: "problem",
            docs: {
              description: `Checks if the name passed to createRule also matches the name of the file`,
              recommended: "error",
            },
            messages: {
              wrongName: "Name of the rule does not match the name of the file",
            },
            schema: [
              {
                type: "object",
                properties: {},
                additionalProperties: false,
              },
            ],
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          create: (): any => undefined,
        },
      ],
    ];

    expect(generateConfigs(packageInfo, rules).recommended).toEqual({
      rules: {
        "@eightyfourjs/rules-for-rules/lint-rule-name": "error",
      },
    });
  });
});
