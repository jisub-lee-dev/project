import config from "@repo/eslint-config/library";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["node_modules/**", "dist/**", ".turbo/**"],
  },
  ...config,
  {
    files: ["**/*.{ts,tsx}", "*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
];
