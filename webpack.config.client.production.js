const path = require('path');
const webpack = require('webpack');
const CURRENT_WORKING_DIRECTORY = process.cwd();
const config = {
    name: 'browser',
    mode: 'production',
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true'
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIRECTORY, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ttf|eof|svg|gif|jpg|png) (\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    }
}

module.exports = config;