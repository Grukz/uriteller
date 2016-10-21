const path = require("path");
const webpack = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
        common: path.join(__dirname, "src/common.js"),
        visits: path.join(__dirname, "src/visits.js")
    },
    output: {
        path: path.join(__dirname, "build/assets"),
        filename: "[name]-[chunkhash].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: [["es2015", {modules: false}], "react"],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(["css"])
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["build"]),
        new webpack.optimize.CommonsChunkPlugin({ name: "common", filename: "common-[chunkhash].js"}),
        new ExtractTextPlugin("[name]-[contenthash].css"),
        new AssetsPlugin({ path: path.join(__dirname, "build"), filename: "assets.json", prettyPrint: true })
    ],
    devtool: "source-map"
};