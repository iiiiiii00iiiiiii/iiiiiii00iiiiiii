module.exports = {
  outputDir: '../../back/dist/www',
  assetsDir: 'assets',
  devServer: {
      proxy: {
          '/api': {
              target: `http://127.0.0.1:${parseInt(process.env.VUE_APP_BACK_PORT)}/api`,
              ws: true,
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      },
      port: process.env.VUE_APP_FRONT_PORT,
      disableHostCheck: true
  },
  productionSourceMap: false
}