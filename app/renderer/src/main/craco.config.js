const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.target = 'electron-renderer';
      return webpackConfig;
    }
  }
};
