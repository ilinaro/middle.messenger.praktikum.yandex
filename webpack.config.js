const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "messenger.bundle.js",
        clean: true,
    },
    resolve: {
        extensions: [
            ".ts",
            ".js",
            ".json",
            ".hbs",
            ".scss",
            ".html",
            ".svg",
            ".ico",
        ],
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/icons/[name][ext]",
                },
            },
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(eot|woff2?|ttf)$/,
                type: "asset",
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[name][ext]",
                },
            },
            {
                test: /\.hbs/,
                use: ["handlebars-template-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
        }),
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
};
