const path = require('path');
const srcRoot = path.resolve(__dirname, '../src');

module.exports = {
    devtool: 'source-map', 
    mode: 'development',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        inline: true,
        historyApiFallback: true
    },

    // 输入配置
    entry: [
        `${srcRoot}/index.js`
    ],

    resolve: {
        alias: {
            '@': srcRoot
        },
        // 按顺序解析这些文件后缀
        extensions: ['.jsx', '.js', 'json']
    },

    // 输出配置
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js',
        publicPath: '/dist'
    },

    module: {
        // 加载器配置
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'], include: path.resolve(srcRoot)},
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'], include: path.resolve(srcRoot)},
            { test: /\.(png|jpg|jpeg)$/, use: 'url-loader?limit=8192&name=images/[name].[hash].[ext]', include: path.resolve(srcRoot)},
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }],
                include: path.resolve(srcRoot)
            }
        ]
    }

};
