const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: "tests/e2e/fixtures",
  screenshotsFolder: "tests/e2e/screenshots",
  videosFolder: "tests/e2e/videos",

  e2e: {
    baseUrl: "http://localhost:8080",
    specPattern: "tests/e2e/specs/**/*.{js,ts}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
