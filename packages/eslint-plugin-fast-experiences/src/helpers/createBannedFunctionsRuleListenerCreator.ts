import type { Rule } from "eslint";

/**
 * @fileoverview Checks if useFetch is not used in -ui components
 * @author Mark Polak
 */

export function createBannedFunctionsRuleListenerCreator({
  bannedFunctions,
  include,
  message,
}: {
  bannedFunctions: string[];
  include?: string;
  message: string;
}): (context: Rule.RuleContext) => Rule.RuleListener {
  return (context) => {
    return {
      CallExpression(node) {
        const checkThisFile = include
          ? new RegExp(include).test(context.getFilename())
          : true;

        if (
          checkThisFile &&
          node.callee.type === "Identifier" &&
          bannedFunctions.includes(node.callee.name)
        ) {
          context.report({
            node,
            message,
          });
        }
      },
    };
  };
}
