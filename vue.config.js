const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true
  },
  configureWebpack: {
    resolve: {
      fallback: { path: false },
    },
  },
})
