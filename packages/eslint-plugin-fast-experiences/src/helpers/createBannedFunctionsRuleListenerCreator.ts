import { TSESLint } from "@typescript-eslint/utils";

/**
 * @fileoverview Checks if useFetch is not used in -ui components
 * @author Mark Polak
 */

export function createBannedFunctionsRuleListenerCreator<
  TMessageIds extends string,
  TOptions extends readonly unknown[]
>({
  bannedFunctions,
  include,
  messageId,
}: {
  bannedFunctions: string[];
  include?: string;
  messageId: TMessageIds;
}): (
  context: TSESLint.RuleContext<TMessageIds, TOptions>
) => TSESLint.RuleListener {
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
            messageId,
          });
        }
      },
    };
  };
}
