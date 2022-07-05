import { TSESLint } from "@typescript-eslint/utils";

type LinterConfigRules = Record<
  string,
  TSESLint.Linter.RuleLevel | TSESLint.Linter.RuleLevelAndOptions
>;

type Configs = { recommended: { rules: LinterConfigRules } };

const getRulePrefixFromPackage = ({ name }: { name: string }): string => {
  return name.replace("eslint-plugin-", "");
};

export function generateConfigs(
  packageInfo: { name: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules: [string, TSESLint.RuleModule<any>][]
): Configs {
  const rulePrefix = getRulePrefixFromPackage(packageInfo);
  const recommended = {
    rules: rules.reduce<LinterConfigRules>((acc, [ruleName, rule]) => {
      if (
        rule.meta?.docs?.recommended &&
        rule.meta?.docs.recommended !== "strict"
      ) {
        acc[`${rulePrefix}/${ruleName}`] = rule.meta.docs.recommended;
      }
      return acc;
    }, {}),
  };

  return {
    recommended,
  };
}
