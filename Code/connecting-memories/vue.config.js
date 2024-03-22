module.exports  = {
    publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/',
    devServer: {
        proxy: {
          '/realms': {
            target: 'http://0.0.0.0:8082', // Replace with your backend API endpoint
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          },
          '/admin': {
            target: 'http://0.0.0.0:8082', // Replace with your backend API endpoint
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        }
      }
}