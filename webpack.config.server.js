const nodeExternals = require('webpack-node-externals');
const CURRENT_WORKING_DIRECTORY = process.cwd();
const config = {
    name: 'server',
    mode: 'development',
    devtool: 'eval-source-map',
    target: "node",
    entry: [
        path.join(CURRENT_WORKING_DIRECTORY, 'server/server.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIRECTORY, '/dist'),
        filename: 'server.generated.js',
        publicPath: '/dist',
        libaryTarget: 'commonjs2'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}

module.exports = config;