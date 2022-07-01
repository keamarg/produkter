const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/app.scss";`,
      },
    },
  },
});
