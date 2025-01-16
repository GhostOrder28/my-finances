const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { https: true },
  outputDir: './build',
  configureWebpack: {
    resolve: {
      extensions: [ 'vue', 'ts' ] // it doesn't work for .ts files
    }
  },
})
