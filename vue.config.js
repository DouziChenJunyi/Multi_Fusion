// const resolve = dir => require('path').join(__dirname, dir)
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

/* eslint-disable no-new */
module.exports = {
  // publicPath: '/', // 网页就用/
  publicPath: process.env.NODE_ENV === 'production' ? './' : './', // 打包时用./
  outputDir: 'dist',
  assetsDir: './src/assets',
  chainWebpack: config => {
	 config.module
	 .rule('less')
	 .use('less-loader')
	 .loader('less-loader')
	 .options({
	    lessOptions: {
	    /** less-loader 配置 */
	      strictMath: true,
	      noIeCompat: true
	    }
	 })
  },
  configureWebpack: {
    resolve: {
	  alias: {
	  '@': resolve('src'), // 配置src目录的别名
	  '_c': resolve('src/components') // 配置公共组件目录的别名
	 }
    }
  }
}

