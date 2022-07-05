import { ESLintUtils } from "@typescript-eslint/utils";
import { createBannedFunctionsRuleListenerCreator } from "../helpers/createBannedFunctionsRuleListenerCreator";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

type Options = [];

type MessageIds = "failure";

/**
 * @fileoverview Checks if useFetch is not used in -ui components
 * @author Mark Polak
 */

const rule = createRule<Options, MessageIds>({
  name: "no-data-retrieving-from-ui-component",
  meta: {
    type: "problem",
    docs: {
      description: "Avoid data retrieving from a presentation component.",
      recommended: "error",
    },
    messages: {
      failure: "Don't retrieve data from a presentation component",
    },
    schema: {},
  },
  defaultOptions: [],
  create: createBannedFunctionsRuleListenerCreator({
    bannedFunctions: ["useFetch"],
    include: "lpc-.*-ui.*$",
    messageId: "failure",
  }),
});

module.exports = rule;
export default rule;
