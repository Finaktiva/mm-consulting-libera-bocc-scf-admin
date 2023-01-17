const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    plugins: [
        new MomentLocalesPlugin({
            localesToKeep: ['es'],
        }),
    ],
};
// "customWebpackConfig": {
//     "path": "./webpack.config.js",
//     "mergeStrategies": { "externals": "replace" }
// },
