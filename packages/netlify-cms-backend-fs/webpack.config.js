/**
 * webpack.config.js
 */
const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));
const peers = Object.keys(pkg.peerDependencies || {});

const externals = (context, request, cb) => {
  const isPeerDep = dep => new RegExp(`^${dep}($|/)`).test(request);
  return peers.some(isPeerDep) ? cb(null, request) : cb();
};

const baseConfig = {
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
  plugins: [],
}

// umdConfig
const umdConfig = Object.assign(
  {},
  baseConfig,
  {
    entry: {
      'fs-backend': './src/implementation.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      library: pkg.name,
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    /**
     * Exclude peer dependencies from package bundles.
     */
    externals,
  }
)

// packageConfig
const packageConfig = Object.assign(
  {},
  baseConfig,
  {
    entry: {
      'index': './src/index.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      library: 'FileSystemBackend',
      libraryTarget: 'assign',
    },
    optimization: {
      minimize: true // default true
    }
  }
)

module.exports = (env, argv) => {
  const isProduction = (argv.mode === 'production');
  if (argv.mode === 'development') {
    packageConfig.devtool = 'source-map';
    umdConfig.devtool = 'source-map';
  }

  const versionPlugin = new webpack.DefinePlugin({
    FILESYSTEMBACKEND_VERSION: JSON.stringify(`${pkg.name} ${pkg.version}${isProduction ? '' : '-dev'}`),
  });
  packageConfig.plugins.push(versionPlugin);
  umdConfig.plugins.push(versionPlugin);

  return [packageConfig, umdConfig];
}
