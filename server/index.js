const Express = require('express');
const Webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('../webpack.config.js');
const bodyParser = require('body-parser');
const crypto = require('crypto');

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

const TOKEN_SECRET = 'THE_GREATEST_SECRET_EVER';

const createToken = (username, password) => {
  const baseToken = Buffer.from(`${username}${password}`).toString('hex');
  const signature = crypto.createHash('md5').update(`${baseToken}${TOKEN_SECRET}`).digest('hex');
  return `${baseToken}.${signature}`;
};

const isValidToken = (token) => {
  const [baseToken, signature] = token.split('.');
  const expected = crypto.createHash('md5').update(`${baseToken}${TOKEN_SECRET}`).digest('hex');
  return expected === signature;
};

apiApp.post('/token', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('Missing username or password');
    return;
  }
  return res.json({
    access_token: createToken(username, password),
    token_type: 'bearer',
  });
});

apiApp.post('/revoke', (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status(400).send('Missing token');
    return;
  }
  if (!isValidToken(token)) {
    res.status(400).send('Invialid token');
    return;
  }
  return res.status(200).end();
});

app.use('/api', apiApp);

app.listen(3000, function () {
  console.log('Development server listening on port 3000!\n');
});
