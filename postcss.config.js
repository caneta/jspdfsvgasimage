const pkg = require('./package.json');

module.exports = () => ({
  plugins: [
    require('autoprefixer'),
    require('cssnano')
  ]
});
