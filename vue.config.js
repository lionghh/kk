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
  lintOnSave: false  // 关闭开发环境语法编译警告
}
