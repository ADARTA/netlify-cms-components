/**
 * webpack.config.js
 */
const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));

const externals = {
  '@emotion/core': {
    root: ['NetlifyCmsDefaultExports', 'EmotionCore'],
    commonjs2: '@emotion/core',
    commonjs: '@emotion/core',
    amd: '@emotion/core',
    umd: '@emotion/core',
  },
  lodash: {
    root: ['NetlifyCmsDefaultExports', 'Lodash'],
    commonjs2: 'lodash',
    commonjs: 'lodash',
    amd: 'lodash',
    umd: 'lodash',
  },
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
    umd: 'react',
  },
  uuid: {
    root: ['NetlifyCmsDefaultExports', 'UUId'],
    commonjs2: 'uuid',
    commonjs: 'uuid',
    amd: 'uuid',
    umd: 'uuid',
  },
}

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: "upward",
          }
        }
      }, {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: "upward",
          }
        }
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'svg-inline-loader'
        }
      }
    ]
  },
  plugins: [],
}

const defaultConfig = {
  ...baseConfig,
  entry: {
    'index': './src/implementation.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'FileSystemBackendClass',
    libraryTarget:'umd',
    libraryExport: 'FileSystemBackend',
    umdNamedDefine: true,
  },
  /**
   * Exclude peer dependencies from package bundles.
   */
  externals,
}

module.exports = (env, argv) => {
  const isProduction = (argv.mode === 'production');
  defaultConfig.devtool = 'source-map';

  const versionPlugin = new webpack.DefinePlugin({
    FILESYSTEMBACKEND_VERSION: JSON.stringify(`${pkg.name} v${pkg.version}${isProduction ? '' : '-dev'}`),
  });
  defaultConfig.plugins.push(versionPlugin);

  return [defaultConfig];
}
