module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888',
        ws: true,
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://127.0.0.1:8888',
        ws: true,
        changeOrigin: true
      },
    }
  },
  publicPath: "/",

}