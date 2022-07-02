import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

type Options = [
  {
    memoizeFunctions: string[];
  }
];

type MessageIds = "noMemoize";

/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

const rule = createRule<Options, MessageIds>({
  name: "no-memoization",
  meta: {
    type: "problem",
    // TODO(mapol): Fix the URL to link to something public.
    docs: {
      description: `Memoizing is a tool many often reach for when they encounter issues
      with re-rendering instead of addressing the underlying problem, or
      "just in case" there is a performance issue. As always with
      performance: Measure, measure, measure.

      For more details, see
      https://dev.azure.com/office/Office/_wiki/wikis/Midgard/22802/Coding-Guidelines?anchor=measure-before-you-memoize`,
      recommended: "error",
    },
    messages: {
      // TODO(mapol): Fix the URL to link to something public.
      noMemoize:
        "Don't memoize unless you've measured the effect (https://dev.azure.com/office/Office/_wiki/wikis/Midgard/22802/Coding-Guidelines?anchor=measure-before-you-memoize)",
    },
    schema: [
      {
        type: "object",
        properties: {
          memoizeFunctions: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [
    {
      memoizeFunctions: ["memo", "React.memo", "memoizeFunction"],
    },
  ],

  create(context, [options]) {
    const bannedFunctions = options.memoizeFunctions;

    return {
      CallExpression(node) {
        const bannedSingleCallExpressions = bannedFunctions.filter(
          (v) => !v.includes(".")
        );
        const bannedCallExpressionsOnMember = bannedFunctions.filter((v) =>
          v.includes(".")
        );

        const isSingleCallExpression =
          node.callee.type === "Identifier" &&
          bannedSingleCallExpressions.includes(node.callee.name);

        const isCallExpressionOnMember =
          node.callee.type === "MemberExpression" &&
          node.callee.property.type === "Identifier" &&
          node.callee.object.type === "Identifier" &&
          bannedCallExpressionsOnMember.includes(
            `${node.callee.object.name}.${node.callee.property.name}`
          );

        if (isSingleCallExpression || isCallExpressionOnMember) {
          context.report({
            node,
            messageId: "noMemoize",
          });
        }
      },
    };
  },
});

module.exports = rule;
export default rule;
