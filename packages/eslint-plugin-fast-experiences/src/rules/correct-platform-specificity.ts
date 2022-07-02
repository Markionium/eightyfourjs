import type { Rule } from "eslint";
import { basename } from "path";

const platformSpecificRegExp = /\.(android|ios|macos|win32)\.(native)\./;

const failureString = (input: string, platform: string) => {
  const fixed = input.replace(platformSpecificRegExp, `.native.${platform}.`);
  return `File appears to have flipped specificity: ${input} should be ${fixed}`;
};

/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
  },

  create(context) {
    return {
      Program(node) {
        const fileName = basename(context.getFilename());
        const match = fileName.match(platformSpecificRegExp);
        if (match) {
          context.report({
            node,
            message: failureString(fileName, match[1]),
          });
        }

        return [];
      },
    };
  },
};

module.exports = rule;
export default rule;
