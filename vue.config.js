const path = require("path");
module.exports = {
    //webpack配置
    configureWebpack: {
      externals: {
        "moment": "moment",
      }
    },
    devServer: {

        //配置端口号
        port: 8080,

        //自动打开浏览器
        open: true,

        proxy: {
          '/api': {
            target: 'http://tsgc.qhd58.net/public/',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        }

    },

    //打包时需要更改为./
    baseUrl: './',

    //打包后生成的文件目录
    // //可以在这里面写mock模拟的数据
    // before(app) {
    // }
    outputDir: 'dist',
    
    //本地或线上是否生成map提示文件
    productionSourceMap: false,

}
