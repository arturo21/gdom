const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const sourcePath = path.resolve(__dirname, 'src');
const destinationPath = path.resolve(__dirname, 'dist');

module.exports = {
  context: sourcePath,
  mode: 'production',
  entry: {
    app: './index.js'
  },
  output: {
    path: destinationPath,
    filename: 'gdom.min.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: sourcePath,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(jpe?g|png)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img_inner/[name][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};
