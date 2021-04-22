const path = require('path');
const webpack = require('webpack');
const CURRENT_WORKING_DIRECTORY = process.cwd();
const config = {
    name: 'browser',
    mode: 'production',
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIRECTORY, 'client/main.js')
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
            }
        ]
    }
}

module.exports = config;