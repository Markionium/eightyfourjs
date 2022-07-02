import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

type Options = [Record<string, unknown>];

type MessageIds = "lazy" | "suspense";

const hasWebExtension = (fileName: string) =>
  /\.web(\.test)?\.tsx?$/.test(fileName);

/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

const rule = createRule<Options, MessageIds>({
  name: "no-react-lazy-and-suspense-in-non-web-files",
  meta: {
    type: "problem",
    // TODO(mapol): Fix the URL to link to something public.
    docs: {
      description:
        "Avoid using React.lazy and React.Suspense in non-web files.",
      recommended: "error",
    },
    messages: {
      // TODO(mapol): Fix the URL to link to something public.
      lazy: "Don't use React.lazy in non-web files",
      suspense: "Don't use React.Suspense in non-web files",
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
    const skipFile = hasWebExtension(context.getFilename());
    let hasReactLazyImport = false;
    let hasReactSuspenseImport = false;

    return {
      ImportDeclaration(node) {
        if (skipFile) {
          return;
        }

        if (node.source.value === "react") {
          node.specifiers.forEach((v) => {
            if (
              v.type === "ImportSpecifier" &&
              v.imported.type === "Identifier"
            ) {
              if (v.imported.name === "lazy") {
                hasReactLazyImport = true;
              }

              if (v.imported.name === "Suspense") {
                hasReactSuspenseImport = true;
              }
            }
          });
        }
      },
      CallExpression(node) {
        if (skipFile) {
          return;
        }

        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "lazy" &&
          hasReactLazyImport
        ) {
          context.report({
            node,
            messageId: "lazy",
          });
        }

        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.type === "Identifier" &&
          node.callee.object.name === "React" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "lazy"
        ) {
          context.report({
            node,
            messageId: "lazy",
          });
        }
      },

      JSXOpeningElement(node) {
        if (skipFile) {
          return;
        }

        if (
          node.name.type === "JSXIdentifier" &&
          node.name.name === "Suspense" &&
          hasReactSuspenseImport
        ) {
          context.report({
            node,
            messageId: "suspense",
          });
        }

        if (
          node.name.type === "JSXMemberExpression" &&
          node.name.object.type === "JSXIdentifier" &&
          node.name.object.name === "React" &&
          node.name.property.name === "Suspense"
        ) {
          context.report({
            node,
            messageId: "suspense",
          });
        }
      },
    };
  },
});

module.exports = rule;
export default rule;
