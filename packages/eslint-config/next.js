import { FlatCompat } from "@eslint/eslintrc";
import libraryConfig from "./library.js";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...libraryConfig,
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/no-unescaped-entities": "off",
    },
  },
];
