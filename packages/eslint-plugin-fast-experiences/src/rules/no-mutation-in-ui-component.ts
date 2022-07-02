import type { Rule } from "eslint";
import { createBannedFunctionsRuleListenerCreator } from "../helpers/createBannedFunctionsRuleListenerCreator";

/**
 * @fileoverview Checks if useMutate is not used in -ui components
 * @author Mark Polak
 */

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Avoid data mutation from presentation components.",
    },
  },
  create: createBannedFunctionsRuleListenerCreator({
    bannedFunctions: ["useMutate"],
    include: "lpc-.*-ui.*$",
    message: "Don't mutate data from a presentation component",
  }),
};

module.exports = rule;
export default rule;
