import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

type Options = [Record<string, never>];

type MessageIds = "wrongName";

const rule = createRule<Options, MessageIds>({
  name: "lint-rule-name",
  meta: {
    type: "problem",
    // TODO(mapol): Fix the URL to link to something public.
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
  defaultOptions: [{}],

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "createRule"
        ) {

          const ruleDefinitionArgument = node.arguments[0];
          const isObjectExpressionArgument = ruleDefinitionArgument.type === "ObjectExpression";
          const nameProperty = isObjectExpressionArgument && ruleDefinitionArgument.properties.find(property => {
            return property.type === "Property" && property.key.type === "Identifier" &&  property.key.name === "name";
          });
          const hasWrongName = nameProperty && nameProperty.type === "Property"  && nameProperty.value.type === "Literal" && nameProperty.value.value && !context.getFilename().endsWith(`${nameProperty.value.value.toString()}.ts`)

          if (
            hasWrongName
          ) {
            context.report({
              node: nameProperty,
              messageId: "wrongName",
            });
          }
        }
      },
    };
  },
});

module.exports = rule;
export default rule;
