'use strict'
// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
// const name = 'vue Element Admin' // page title

module.exports = {

  // baseUrl: './', vue-cli3已经使用publicPath
  // outputDir: 'dist',
  // publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  // 把这个改为false。不然在最终打包的文件中会出现一些map文件，map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 3000
    // proxy: {}
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
  //     proxy: {
  //         '/api':{
  //             target:'http://jsonplaceholder.typicode.com',
  //             changeOrigin:true,
  //             pathRewrite:{
  //                 '/api':''
  //             }
  //         },
  //         '/ms':{
  //             target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  //             changeOrigin: true
  //         }
  //     }
  // }
}
