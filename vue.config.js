'use strict'
// const path = require('path')
const webpack = require('webpack')

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
// const name = 'vue Element Admin' // page title

module.exports = {

  // baseUrl: './', vue-cli3已经使用publicPath
  // publicPath: '/', history模式打包用  publicPath: './' hash模式打包用
  publicPath: './', // 这样表示相对路径， 可以部署在任意路径下，如果为 / 则只能在nginx的html的根路径下面，如果指定为/app/ ，则可以部署在/app下面，默认为/
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: process.env.ENV === 'development',
  // 把这个改为false。不然在最终打包的文件中会出现一些map文件，map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        // target: 'https://www.easy-mock.com/mock/5c8c8e03800fbb7305fd80c1/example_copy',
        target: 'http://localhost:9010',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      'window.Quill': 'quill'
    }])
  }
  // configureWebpack: {
  //   // provide the app's title in webpack's name field, so that
  //   // it can be accessed in index.html to inject the correct title.
  //   name: name,
  //   resolve: {
  //     alias: {
  //       '@': resolve('src')
  //     }
  //   }
  // }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://jsonplaceholder.typicode.com',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '/api': ''
  //       }
  //     },
  //     '/ms': {
  //       target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  //       changeOrigin: true
  //     }
  //   }
  // }
}
