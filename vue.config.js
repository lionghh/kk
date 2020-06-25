module.exports = {

  // 跨域
  devServer: {
		proxy: {
			'/renren-fast': {
        //target: 'https://127.0.0.1:8889'
        target: 'https://zzttt.xyz:8889'
			},
		}
	},

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
