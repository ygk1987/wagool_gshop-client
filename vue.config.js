module.exports = {
  // lintOnSave: false, //直接关闭eslint语法检查
  // lintOnSave: 'warning', //只输出提示信息,项目正常运行

  devServer: {
    proxy: {
      '/api': {//只处理/api开头路径的请求
        target: 'http://182.92.128.115/', //转发的目标地址
        // ws: true,
        changeOrigin: true //支持跨域
      }
    }
  },
}