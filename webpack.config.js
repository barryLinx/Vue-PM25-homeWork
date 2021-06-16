const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');



module.exports = {
  entry: {
    app: './js/PM.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env',
              // {
              //   plugins:['@babel/plugin-transform-runtime']
              // }
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            // inject CSS to page
            loader: 'style-loader'
          },
          {
            // inject CSS to page
            loader: 'css-loader'
          }         
          
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      
      template: './index.html',
      filename: 'main.html',
      chunks: ['vendor', 'app']
    }),
    new Dotenv() 
  ],
  devtool: "source-map",
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 4040,
    hot:true
  },

  // resolve: {
  //   fallback: {
  //     "path": require.resolve("path-browserify")
  //   }
  // }

}