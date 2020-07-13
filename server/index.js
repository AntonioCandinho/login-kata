const Express = require('express');
const Webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('../webpack.config.js');

const app = Express();
const compiler = Webpack({
  ...WebpackConfig,
  mode: 'development',
  entry: ['webpack-hot-middleware/client?reload=true', WebpackConfig.entry],
  plugins: [new Webpack.HotModuleReplacementPlugin(), ...WebpackConfig.plugins],
});

app.use(WebpackDevMiddleware(compiler, { publicPath: '/' }));
app.use(WebpackHotMiddleware(compiler));

app.listen(3000, function () {
  console.log('Development server listening on port 3000!\n');
});
