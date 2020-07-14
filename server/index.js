const Express = require('express');
const Webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('../webpack.config.js');
const bodyParser = require('body-parser');

const app = Express();
const compiler = Webpack({
  ...WebpackConfig,
  mode: 'development',
  entry: ['webpack-hot-middleware/client?reload=true', WebpackConfig.entry],
  plugins: [new Webpack.HotModuleReplacementPlugin(), ...WebpackConfig.plugins],
});

app.use(WebpackDevMiddleware(compiler, { publicPath: '/' }));
app.use(WebpackHotMiddleware(compiler));

const apiApp = Express();
apiApp.use(bodyParser.json());
apiApp.use(bodyParser.urlencoded({ extended: true }));

apiApp.post('/token', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('Missing username or password');
    return;
  }
  const token = Buffer.from(`${username}${password}`).toString('hex');
  return res.json({
    access_token: token,
    token_type: 'bearer',
  });
});

app.use('/api', apiApp);

app.listen(3000, function () {
  console.log('Development server listening on port 3000!\n');
});
