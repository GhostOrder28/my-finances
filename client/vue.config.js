const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: { https: true },
  outputDir: '../server/public',
  configureWebpack: {
    resolve: {
      alias: {
        '#backend': path.resolve(__dirname, '../server/src/types')
      },
      extensions: [ 'vue', 'ts' ] // it doesn't work for .ts files
    }
  },
  // chainWebpack: config => {
  //   // config.resolve.alias.set('#backend', path.resolve(__dirname, '../server/src/types/*'));
  //   const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  //   types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))
  // },
})

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/css/variables.scss'),
      ],
    })
}
