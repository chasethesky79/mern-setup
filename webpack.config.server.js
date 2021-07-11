const nodeExternals = require('webpack-node-externals');
const CURRENT_WORKING_DIRECTORY = process.cwd();
const path = require('path');
const config = {
    name: 'server',
    target: "node",
    entry: [
        path.join(CURRENT_WORKING_DIRECTORY, 'server/server.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIRECTORY, '/dist'),
        filename: 'server.generated.js',
        publicPath: '/dist'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    }
}

module.exports = config;