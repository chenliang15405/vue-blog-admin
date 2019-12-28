## Vue优化配置

> 如果没有对Vue项目进行优化，随着加入更多的依赖和更多的组件，那么打包和编译的项目
体积会越来越大，访问首页加载的速度也会非常慢

记录本次优化的一些配置和记录

优化的对比：

- 没有优化之前的打包的体积和加载首页的速度为：
`npm run build` 打包之后的项目体积为：15M左右
部署到Nginx中，首页的加载速度为: 17s左右

- 对vue进行优化配置和nginx优化配置之后：
`npm run build` 打包之后的体积：4.3M
部署到Nginx中，首页的加载速度为：549ms-1s左右

> 因为首页的内容不多，就是一个登录页面，所以加载速度提升的非常明显，不过这样也可以看出来
优化前后的性能对比非常大，优化是一个必不可少的环节

### 优化点记录

**一、先使用vue-clie的分析工具查看**

1. vue-cli 2.x自带了分析工具   
直接运行`npm run build --report`

2. vue-cli3 需要先安装依赖   
 - `npm install webpack-bundle-analyzer --save-dev`   
 - vue.config.js中配置: [vue-config.js官方说明](https://cli.vuejs.org/zh/config/) 
    ```js
    // 添加分析工具
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
        config.plugins.delete('prefetch')
      }
    }
    ```
  - 运行`npm run build --report` 会打开一个浏览器窗口，就可以直观的看见每个依赖包的大小和是否重复使用
 

**二、 开始优化**

**1. 路由懒加载**   
>设置路由懒加载可以防止在首屏的时候就将全部的路由加载，当使用到哪个路由的时候，再进行加载，这样会提升性能和提升首页访问时间
    
- 将router.js中这种配置路由的方式： 
    ```js
     import Login from './pages/Login.vue'
    
     { path: '/login', name: 'Login', component: Login }
    ```
    修改为:
    ```js
        {
          path: '/login',
          name: 'Login'
          component: resolve => require(['./pages/Login.vue'], resolve)
        }
    ```
- vuecli 3默认开启prefetch(预先加载模块)，提前获取用户未来可能会访问的内容[vue-cli3官方说明](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch)      
所以，去掉这个模版或者开启都可以，如果首屏性能提升，则关闭这个模块
    ```js
    // vue.config.js
    module.exports = {
      chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    
        // 或者
        // 修改它的选项：
        config.plugin('prefetch').tap(options => {
          options[0].fileBlacklist = options[0].fileBlacklist || []
          options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
          return options
        })
      }
    }
    ```
    当 prefetch 插件被禁用时，你可以通过 webpack 的内联注释手动选定要提前获取的代码区块：
   ```js
    import(/* webpackPrefetch: true */ './someAsyncComponent.vue')
    ```
        
**2. 优化Element**
> 使用过了很多Elment的组件，所以可以将Element组件进行按需引入，而不是直接引入全部的组件，这样Element组件的依赖会非常大

- 按需引入Element
    ```js
    // main.js中按需引入
    import { Button, Input, Pagination, Table, TableColumn, MessageBox } from 'element-ui';
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Pagination)
    // Messagge、notify、loading等这些按需引入需要下面这种方式，具体看官方文档
    Vue.prototype.$alert = MessageBox.alert
     
    // 设置样式
    Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
    ```
- 在babel.config.js或者.babelrc文件中添加配置：
  vue-cli 3要先安装babel-plugin-component
  `npm install babel-plugin-component -D`
  
    ```js
      // babel.config.js 或者.babelrc
      {
        "plugins": [
            [
              "component",
              {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
              }
            ]
          ]
      }
    ```

**3. 压缩代码和js、css切割**

- 下面这个配置，测试发现代码好像并没有压缩，可能这个配置在vue-cli3中不支持了，不过配上也不报错：
    ```js
        config.optimization.minimize(true) // 配置压缩代码
        config.optimization.splitChunks({ // js,css代码分割
          chunks: 'all'
        })
    ```
- 这个配置js、css压缩是工作的，生成的js、css都是经过压缩的，并且打包体积直接就会变小很多
    - 安装插件:   
    `nmp i compression-webpack-plugin -D`
    ```js
    // vue.config.js
  
    const CompressionPlugin = require('compression-webpack-plugin') // 压缩js、css
  
    module.exports = {
      
      chainWebpack: config => {  
        // 开启js、css压缩
        if (process.env.NODE_ENV === 'production') {
          config.plugin('compressionPlugin')
            .use(new CompressionPlugin({
              test: /\.js$|\.html$|.\css/, // 匹配文件名
              threshold: 10240, // 对超过10k的数据压缩
              deleteOriginalAssets: false // 不删除源文件
            }))
          }
       }  
    }
    ```

**4.vue-cli3配置gzip、Nginx配置gzip**
> vue-cli3开启gzip配置，nginx也开启gzip配置，压缩代码，提升性能

- vue-clie3配置gzip
    - 安装插件(上面已经安装则不用再安装):   
    `nmp i compression-webpack-plugin -D`
    - 配置vue.config.js
        ```js
        const CompressionPlugin = require('compression-webpack-plugin')
        // 定义压缩文件类型
        const productionGzipExtensions = ['js', 'css']
  
        module.exports = {
           configureWebpack: {
              plugins: [
                new CompressionPlugin({
                  filename: '[path].gz[query]',
                  algorithm: 'gzip',
                  test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                  threshold: 10240,
                  minRatio: 0.8
                })
              ]
            }
        }
        ```

- Nginx配置gzip   
    配置nginx.config
    ```js
    http {
          gzip               on; #开启或关闭gzip on off
          gzip_min_length    100k; #gzip压缩最小文件大小，超出进行压缩（自行调节）
          gzip_buffers       4  16k; #buffer 不用修改
          gzip_comp_level    5; #压缩级别:1-10，数字越大压缩的越好，时间也越长
          gzip_types         text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png; #  压缩文件类型
          gzip_vary          off;
          gzip_proxied       expired no-cache no-store private auth;
          gzip_disable       "MSIE [1-6]\.";  # IE6不使用gzip 
    }
    ```

**5. 使用外部CDN**
> 项目的第三方跟依赖可以使用外部CDN，进一步提升性能和打包之后的体积，访问的速度会提升

- vue.config.js中配置
    ```js
    // 开启使用外部文件，cdn
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'element-ui': 'ELEMENT'
      })
    }
    ```
    注意：配置在production环境使用cdn，本地使用依赖方便调试
    
- index.html中引入cdn文件
    ```html
    // public/index.html
      <head>
       <!--element的css文件，放在head中-->
       <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
      </head>
      <body>
          <!--js的cdn文件必须放在body中-->
          <script src="https://cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js"></script>
          <script src="https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js"></script>
          <script src="https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js"></script>
          <script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
          <script src="https://cdn.bootcss.com/element-ui/2.3.3/index.js"></script>
      </body>
    ```
- 修改使用vue、vuex、element css、vue-router的引入
    ```js
    // main.js
    
    // 注释掉引入的element.css
    // import 'element-ui/lib/theme-chalk/index.css'
    
    // 修改为在development环境下使用，production环境使用的是cdn文件
    if (process.env.NODE_ENV === 'development') {
      require('element-ui/lib/theme-chalk/index.css')
    }
    ```
    ```js
    // router.js
    
    // 修改为development下使用第三方依赖，production使用cdn
    if (process.env.NODE_ENV === 'development') {
      Vue.use(Router)
    }
    ```
    ```js
    // store.js
    
    // development使用第三方依赖，production使用cdn
    if (process.env.NODE_ENV === 'development') {
      Vue.use(Vuex)
    }
    ```

- 这样改完之后，production环境下正常使用，但是development环境下，即本地启动会报错
    > 因为在index.html中引入了cdn，就代表默认使用cdn，但是只给produciton环境配置了externals，
    所以，需要针对不同的环境使用不同的index.html，即在public下存在不同环境的index.html
    
    - 创建文件`index.prod.html`作为production环境的入口文件
    ```html
     // index.prod.html
     
     <head>
        <!--element的css文件，放在head中-->
        <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
       </head>
       <body>
           <!--js的cdn文件必须放在body中-->
           <script src="https://cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js"></script>
           <script src="https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js"></script>
           <script src="https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js"></script>
           <script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
           <script src="https://cdn.bootcss.com/element-ui/2.3.3/index.js"></script>
       </body>
    ```
    - public/index.html作为development环境的入口文件
    ```html
    // index.html 
    // 去除掉cdn文件
     <body>
        <noscript>
          <strong>We're sorry but vue-blog-admin doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
        </noscript>
        <div id="app"></div>
      </body>
    ```
    
    - vue.config.js中配置多环境的入口模版文件
    ```js
    module.exports = {
      if (process.env.NODE_ENV === 'production') {    
            // 注入不同的模版, production使用的是CDN
            config.plugin('html')  // 这里的html就相当于vue-cli2中的HtmlWebpackPlugin
              .tap(args => {
                // 指定production的入口文件名称和路径
                args[0].template = 'public/index.prod.html'
                return args
              })
       }
    }
    ```
    
- vue-cli2中使用不同环境的入口文件

    - index.html还是创建2个不同名称的，production使用cdn，development使用依赖
    
    - 提取配置外部文件的webpack.base.conf.js到webpack.prod.conf.js中
    ```js
    // webpack.prod.conf.js
    module.exports = {
      ...
      externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT'
      }
      ...
    }
    ```

    - 修改 build/webpack.dev.conf.js:
    ```js
    plugins: [
      ...
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      })
    ]
    ```
    - 修改 build/webpack.prod.conf.js:
    ```js
    plugins: [
      ...
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.prod.html',
        inject: true,
        ...
      })
    ]
    ```

经过压缩代码、使用CDN、gzip的开启、nginx的配置，性能和打包的体积会优化很多，
初步的优化完成。