module.exports = {
  css: {
    loaderOptions: {
      css: {
        'sourceMap': true
      },
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ],
        'sourceMap': true
      },
      postcss: {
        'sourceMap': true
      }
    },
    sourceMap: true
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    proxy: {
      '/attendance': {   // 代理地址规则
        // target: "http://127.0.0.1:8888",         // 本机环境
        // target: 'http://121.42.183.206:9080',    // 测试环境
        target: "http://121.42.183.206:9081",         // 部署环境
        changeOrigin: true
      /*  pathRewrite: {
          '^/': '/attendance/'                 // 重写请求路径，添加/attendance
        }*/
      }
    }
  },
  lintOnSave: false  // 关闭开发环境语法编译警告
}
