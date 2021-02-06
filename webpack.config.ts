import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';

const webpackConfig = (): Configuration => ({
    entry: "./src/index.tsx",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, './src/components'),
            src: path.resolve(__dirname, './src/'),
            config: path.resolve(__dirname, './config')
        }
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: "bundle.js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: {
                            localIdentName: '[name]-[local]-[hash:base64:3]'
                        }
                    }
                }],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                       {
                         loader: 'file-loader',
                         options: {
                         name: '[path][name].[ext]',
                                  },
                       },
                      ],
            },
            {
                 test: /\.tsx?$/,
                 loader: 'ts-loader',
                 options: {
                           transpileOnly: true,
                          },
                 exclude: /dist/,
            },
        ]
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    devServer: {
        port: 3000,
        publicPath: "/",
        contentBase: "./public",
        hot: true,
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                pathRewrite: {"^/api" : ""}
            }
        }
    }
})

export default webpackConfig;