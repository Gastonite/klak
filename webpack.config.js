'use strict';

const Path = require('path');
const Webpack = require('webpack');

module.exports = () => {

  const entry = Path.resolve(__dirname, './src/emitter.js');

  const output = {
    path: Path.resolve(__dirname, './build'),
    filename: 'emitter.js'
  };

  const loaders = [
    {test: /\.js$/, use: 'babel-loader' }
  ];

  const plugins = [new Webpack.NamedModulesPlugin(), new Webpack.optimize.UglifyJsPlugin()];

  return {
    entry,
    output,
    module: {
      loaders
    },
    plugins
  };

};