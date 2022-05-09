const path = require('path');

module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname + '/src');
    return config;
  },
};
