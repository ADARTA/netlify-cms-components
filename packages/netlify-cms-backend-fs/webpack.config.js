/**
 * webpack.config.js
 */
const path = require('path');
const pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = {
  entry: {
    'fs-backend': './src/implementation.js',
    'index': './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: pkg.name,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.join(__dirname, 'babel.config.js'),
          }
        }
      }, {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.join(__dirname, 'babel.config.js'),
          }
        }
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'svg-inline-loader'
        }
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  /**
   * Exclude peer dependencies from package bundles.
   */
  externals: (context, request, cb) => {
    const externals = Object.keys(pkg.peerDependencies || {});
    const isPeerDep = dep => new RegExp(`^${dep}($|/)`).test(request);
    return externals.some(isPeerDep) ? cb(null, request) : cb();
  },
}