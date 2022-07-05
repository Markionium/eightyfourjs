import { ESLintUtils } from "@typescript-eslint/utils";
import { basename } from "path";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

type Options = [];

type MessageIds = "failure";

const platformSpecificRegExp = /\.(android|ios|macos|win32)\.(native)\./;

const rule = createRule<Options, MessageIds>({
  name: "correct-platform-specificity",
  meta: {
    type: "problem",
    docs: {
      recommended: "error",
      description:
        "Checks if the platform specificity of a file name is provided correctly.",
    },
    messages: {
      failure:
        "File appears to have flipped specificity: {input} should be {fixed}",
    },
    schema: {},
  },

  defaultOptions: [],

  create(context) {
    return {
      Program(node) {
        const fileName = basename(context.getFilename());
        const match = fileName.match(platformSpecificRegExp);
        if (match) {
          const platform = match[1];
          context.report({
            node,
            messageId: "failure",
            data: {
              input: fileName,
              fixed: fileName.replace(
                platformSpecificRegExp,
                `.native.${platform}.`
              ),
            },
          });
        }

        return [];
      },
    };
  },
});

module.exports = rule;
export default rule;
