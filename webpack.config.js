const path = require('path');
// https://blog.jakoblind.no/debug-webpack-app-browser/
module.exports = {
  entry: './main.js',
  output: {
    library: 'MyRenderLibrary',
    filename: 'desertgame.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // remove this before releasing. THAT IS REQUIRED 100%
  mode:"development"
};