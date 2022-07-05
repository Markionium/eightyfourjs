#!/usr/bin/env node
import * as path from "path";
import requireIndex from "requireindex";
import { generateConfigs } from "../generateConfigs";
import type { TSESLint } from "@typescript-eslint/utils";
import fs from "fs";
import prettier from "prettier";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require(path.join(process.cwd(), "package.json")) as {
  name: string;
};
const requiredFromIndex: Record<string, unknown> = requireIndex(
  path.join(process.cwd(), "lib", "rules")
);

function quacksLikeALintRule(
  entry: [string, unknown]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): entry is [string, TSESLint.RuleModule<any>] {
  const [, v] = entry;
  return typeof v === "object" && v !== null && "create" in v && "meta" in v;
}

const rules = Object.entries(requiredFromIndex).filter(quacksLikeALintRule);

const configs = generateConfigs(packageJson, rules);

const writeConfigs = Object.entries(configs).map(([configName, config]) => {
  const fileName = path.join(
    process.cwd(),
    "src",
    "configs",
    `${configName}.ts`
  );
  return fs.promises
    .writeFile(
      fileName,
      prettier.format(
        `module.exports =  ${JSON.stringify(config, undefined, 2)};`,
        { parser: "babel" }
      )
    )
    .then(() => console.log(`Wrote: ${fileName}`));
});

Promise.all(writeConfigs).catch((e) => {
  console.error(e);
  throw new Error("Failed to write configs");
});
