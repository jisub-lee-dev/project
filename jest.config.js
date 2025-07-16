/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      displayName: "packages/ui",
      testMatch: ["<rootDir>/packages/ui/**/*.test.{js,ts,tsx}"],
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/packages/ui/jest.setup.js"],
      moduleNameMapping: {
        "^@/(.*)$": "<rootDir>/packages/ui/src/$1",
      },
    },
    {
      displayName: "packages/utils",
      testMatch: ["<rootDir>/packages/utils/**/*.test.{js,ts}"],
      testEnvironment: "node",
      moduleNameMapping: {
        "^@/(.*)$": "<rootDir>/packages/utils/src/$1",
      },
    },
    {
      displayName: "packages/validation",
      testMatch: ["<rootDir>/packages/validation/**/*.test.{js,ts}"],
      testEnvironment: "node",
      moduleNameMapping: {
        "^@/(.*)$": "<rootDir>/packages/validation/src/$1",
      },
    },
    {
      displayName: "packages/db",
      testMatch: ["<rootDir>/packages/db/**/*.test.{js,ts}"],
      testEnvironment: "node",
      moduleNameMapping: {
        "^@/(.*)$": "<rootDir>/packages/db/src/$1",
      },
    },
  ],
  collectCoverageFrom: [
    "packages/*/src/**/*.{js,ts,tsx}",
    "!packages/*/src/**/*.d.ts",
    "!packages/*/src/**/*.stories.{js,ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
