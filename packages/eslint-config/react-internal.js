const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: ["./library.js", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  plugins: ["react"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  env: {
    browser: true,
  },
}; 