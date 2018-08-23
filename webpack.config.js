const path = require('path');
const uglify = require("uglifyjs-webpack-plugin");  // 压缩js
const htmlPlugin = require("html-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");

var website = {
    publicPath:"http://192.168.3.244:1718/"
}

module.exports={
    devtool:"eval-source-map",
    entry:{
        entry:'./src/bundle.js',
        entry2:"./src/bundle2.js"
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:website.publicPath
    },
    module:{
        rules: [
            {
              test: /\.css$/,
              use:extractTextPlugin.extract({
                  fallback:"style-loader",
                  use:[
                      {
                          loader:"css-loader",
                          options:{
                            importLoaders: 1
                          }
                      },
                      'postcss-loader'
                  ]
              })
            },
            {
                test:/\.(png|jpg|gif)/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:500,
                            outputPath:"images/"
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader']
            },
            {
                test:/\.scss$/,
                use: extractTextPlugin.extract({
                    use:[
                        {
                            loader:"css-loader"
                        },
                        {
                            loader:"sass-loader"
                        }
                    ],
                    fallback:"style-loader"
                })
            },
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader',
                },
                exclude:/node_modules/
            }
          ]
    },
    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true //是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash:true,
            template:"./src/index.html"
        }),
        new extractTextPlugin("/css/index.css"),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
            })
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'192.168.3.244',
        compress:true,
        port:1718
    }
}