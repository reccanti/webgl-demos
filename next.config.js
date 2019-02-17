const process = require("process");

module.exports = {
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/demos/01-basic-triangle': { page: '/demos/01-basic-triangle' }
    }
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "https://reccanti.github.io/webgl-demos" : "",
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config;
  }
}
