const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript({
  target: "serverless",
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/demos/01-basic-triangle': { page: '/demos/01-basic-triangle' }
    }
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config;
  }
});
