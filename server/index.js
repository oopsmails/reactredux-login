import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
// import webpackConfig from '../webpack.config.dev';

let app = express();

// app.use(webpackMiddleware(webpack(webpackConfig)));

const SERVER_PORT = 3080;

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(SERVER_PORT, () => { console.log('Running on locoalhost:' + SERVER_PORT) } );
