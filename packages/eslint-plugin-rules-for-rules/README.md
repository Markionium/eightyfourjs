# eslint-plugin-rules-for-rules

Lint rules for writing lint rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-rules-for-rules`:

```sh
npm install eslint-plugin-rules-for-rules --save-dev
```

## Usage

Add `rules-for-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "rules-for-rules"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "rules-for-rules/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


