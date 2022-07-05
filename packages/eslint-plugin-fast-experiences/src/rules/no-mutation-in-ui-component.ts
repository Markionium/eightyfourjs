import { ESLintUtils } from "@typescript-eslint/utils";
import { createBannedFunctionsRuleListenerCreator } from "../helpers/createBannedFunctionsRuleListenerCreator";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

type Options = [];

type MessageIds = "failure";

/**
 * @fileoverview Checks if useMutate is not used in -ui components
 * @author Mark Polak
 */

const rule = createRule<Options, MessageIds>({
  name: "no-mutation-in-ui-component",
  meta: {
    type: "problem",
    docs: {
      description: "Avoid data mutation from presentation components.",
      recommended: "error",
    },
    messages: {
      failure: "Don't mutate data from a presentation component",
    },
    schema: {},
  },
  defaultOptions: [],
  create: createBannedFunctionsRuleListenerCreator({
    bannedFunctions: ["useMutate"],
    include: "lpc-.*-ui.*$",
    messageId: "failure",
  }),
});

module.exports = rule;
export default rule;
