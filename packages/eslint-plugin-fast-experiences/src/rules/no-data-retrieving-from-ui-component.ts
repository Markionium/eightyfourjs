import type { Rule } from "eslint";
import { createBannedFunctionsRuleListenerCreator } from "../helpers/createBannedFunctionsRuleListenerCreator";

/**
 * @fileoverview Checks if useFetch is not used in -ui components
 * @author Mark Polak
 */

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Avoid data retrieving from a presentation component.",
    },
  },
  create: createBannedFunctionsRuleListenerCreator({
    bannedFunctions: ["useFetch"],
    include: "lpc-.*-ui.*$",
    message: "Don't retrieve data from a presentation component",
  }),
};

module.exports = rule;
export default rule;
