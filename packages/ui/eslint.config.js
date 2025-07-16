import config from "@repo/eslint-config/react-internal";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".turbo/**",
      "jest.setup.js",
      "scripts/**/*.js",
    ],
  },
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
