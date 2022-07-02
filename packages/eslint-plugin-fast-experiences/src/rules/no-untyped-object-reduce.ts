import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

type Options = [Record<string, unknown>];

type MessageIds = "unsafe";

const rule = createRule<Options, MessageIds>({
  name: "no-untyped-object-reduce",
  meta: {
    type: "problem",
    // TODO(mapol): Fix the URL to link to something public.
    docs: {
      description: `The type of {} is {}
      any object is assignable to {}
      {} is assignable to any indexed type (\`{[key in string]: whatever}\`)
      
      A reduce call with an empty object initializer and no type signature, will
      infer the {} type for the accumulator and result of the reduce
      expression. Since anything is assignable to {}, this means the reduce
      function is essentially unchecked. The result of the expression can then also
      be assigned to an incompatible type without raising any errors.
      
      This rule warns if a reduce call takes an empty object as the initial value
      and has no type signatures.`,
      recommended: "error",
    },
    messages: {
      unsafe: "Unsafe array reduce, please add type signature",
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
          node.callee.type === "MemberExpression" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "reduce"
        ) {
          const funcArgument = node.arguments[0];
          const initArgument = node.arguments[1];

          const isObjectLiteralInitArgument =
            initArgument && initArgument.type === "ObjectExpression";
          const doesNotHaveAccumulatorTypeArgument =
            funcArgument &&
            funcArgument.type === "ArrowFunctionExpression" &&
            funcArgument.params[0] &&
            funcArgument.params[0].type === "Identifier" &&
            funcArgument.params[0].typeAnnotation === undefined;

          const doesNotHaveReduceTypeArgument =
            node.typeParameters?.params[0] === undefined;

          console.log();

          if (
            isObjectLiteralInitArgument &&
            doesNotHaveAccumulatorTypeArgument &&
            doesNotHaveReduceTypeArgument
          ) {
            context.report({
              node,
              messageId: "unsafe",
            });
          }
        }
      },
    };
  },
});

module.exports = rule;
export default rule;
