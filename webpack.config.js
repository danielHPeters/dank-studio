module.exports = {
  entry: './src/oscillator/app.js',
  output: {
    filename: './public/js/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
