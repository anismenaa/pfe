module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300
    return config;
  }
}

const withImages = require('next-images')
module.exports = withImages()