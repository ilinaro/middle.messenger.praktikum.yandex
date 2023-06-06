const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'messenger.bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.hbs', '.scss', '.html', '.svg'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: 'svg-loader',
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.hbs/,
        use: [
          {
            loader: 'handlebars-template-loader',
            options: {
              runtime: path.resolve(__dirname, 'src/Helpers'),
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader', // Translates CSS into CommonJS modules
          'sass-loader', // Compiles Sass to CSS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
}
