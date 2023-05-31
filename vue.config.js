const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    setupMiddlewares: require('./mock/user.js')
  },
  configureWebpack: {
    resolve: {
      fallback: { path: false },
    },
  },
})
