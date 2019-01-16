const path = require('path');

module.exports = {
  // https://cli.vuejs.org/zh/config/
  outputDir: undefined,

  baseUrl: undefined,
  assetsDir: 'static',

  // pages: {}, 构建多页面
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 不需要生产时的源映射
  productionSourceMap: false,

  devServer: {
    disableHostCheck: true,
    port: 8888,
    host: '0.0.0.0',
    https: false,
    open: true,
    proxy: {
      '/admin': {
        target: 'http://10.1.1.12:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/admin': '',
        },
        // cookieDomainRewrite: 'localhost',
        // onProxyRes: function (proxyRes, req, res) {
        //   var cookies = proxyRes.headers[ 'set-cookie' ]
        //   //修改cookie Path
        //   if (cookies) {
        //     var cookieRegex = /path/g;
        //     var newCookie = cookies.map(function (cookie) {
        //       if (cookieRegex.test(cookie)) {
        //         // 去掉安全验证
        //         return cookie.replace(/secure;/g, '')
        //       }
        //       return cookie;
        //     })
        //     //修改cookie path
        //     delete proxyRes.headers[ 'set-cookie' ]
        //     proxyRes.headers[ 'set-cookie' ] = newCookie;
        //   }
        // }
      },
      '/cas': {
        target: 'http://10.1.1.12:8888',
        changeOrigin: true,
      },
      '/logout': {
        target: 'http://10.1.1.12:8888',
        changeOrigin: true,
      },
    },
  },
  // chainWebpack: (config) => {
  //   // config
  //   //   .plugin('copy')
  //   //   .tap((args) => {
  //   //     args[0].push(
  //   //       {
  //   //         from: path.resolve(__dirname, './static'),
  //   //         to: path.resolve(__dirname, './dist/static/'),
  //   //         toType: 'dir',
  //   //         ignore: [],
  //   //       },
  //   //     );
  //   //     return args.concat([]);
  //   //   });

  //   // const eslintRule = config.module.rule('eslint');
  //   // eslintRule.uses.clear();
  // },
  configureWebpack: (config) => {
    Object.assign(config, {
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
        },
      },
    });
  },
  pluginOptions: {
    movefiles: {
      source: './dist/*',
      dest: '/home/project/fp',
    },
  },
  runtimeCompiler: true,
  parallel: undefined,
  css: undefined,
};
