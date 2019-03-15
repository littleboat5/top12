var webpack = require('webpack');
const {EnvironmentPlugin} = require("webpack");

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins:[
    new webpack.EnvironmentPlugin([
      'NYT_API_KEY',
      'TMDB_API_KEY', 
      'GOOGLE_BOOK_API_KEY',
      'LASTFM_API_KEY'])
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
