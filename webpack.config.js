const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ['babel-polyfill', 'src/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebPackPlugin({
        template: "src/index.html",
        filename: "index.html"
      }),
    new CopyWebpackPlugin(
      [{context:'public/resources/',from:'**/*', to:'resources'}]
    ),
    new MiniCssExtractPlugin({filename:'[name].style.css'})
  ],
  resolve:{
        alias:{
          src: path.resolve(__dirname, "src"),
          components: path.resolve(__dirname, "src", "components"),
          resources: path.resolve(__dirname, "public", "resources"),
          public: path.resolve(__dirname, "public"),
          styles: path.resolve(__dirname, "src", "styles"),
        }
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options:{
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]   
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images/'
          }
        }
      },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: {
           loader: 'file-loader',
           options: {
             outputPath: 'fonts/'
           }
         }
       },         
    ]
  }
};    
