const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_SERVE,
        changeOrigin: true,
        pathRewrite: {'^/dev-api':''}
      }
    }
    // setupMiddlewares: require('./mock/user.js')
  },
  configureWebpack: {
    resolve: {
      fallback: { path: false },
    },
  },
})
