module.exports = {
  extends: ["./library.js", "next/core-web-vitals"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
}; 