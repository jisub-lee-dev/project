import config from "@repo/eslint-config/library";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...config,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
];
