const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'messenger.bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.hbs', '.scss', '.html'],
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
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
}
