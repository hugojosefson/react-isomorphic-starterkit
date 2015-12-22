import babelPolyfill from 'babel-polyfill';
import express from 'express';
import requestProxy from 'express-request-proxy';
import React from 'react';
import ReactDOM from 'react-dom/server';
import * as ReactRouter from 'react-router';
import * as history from 'history';
import Transmit from 'react-transmit';

import githubApi from 'apis/github';
import routesContainer from 'containers/routes';

try {
    const app = express();
    const hostname = process.env.HOSTNAME || 'localhost';
    const port = process.env.PORT || 8000;
    let routes = routesContainer;

    app.use(express.static('static'));

    app.all('/api/github/*', requestProxy({url: 'https://api.github.com/*'}));

    app.use((req, res) => {
        const webserver = __PRODUCTION__ ? '' : `//${req.hostname}:8080`;
        const location = history.createLocation(req.path);

        ReactRouter.match({routes, location}, (error, redirectLocation, renderProps) => {
            if (redirectLocation) {
                res.redirect(redirectLocation.pathname + redirectLocation.search);
                return;
            }

            if (error || !renderProps) {
                res.status(500).send(error);
                return;
            }

            Transmit.renderToString(ReactRouter.RoutingContext, renderProps).then(({reactString, reactData}) => {
                const template = (
                    `<!doctype html>
						<html lang="en-us">
							<head>
								<meta charset="utf-8">
								<title>react-isomorphic-starterkit</title>
								<link rel="shortcut icon" href="/favicon.ico">
							</head>
							<body>
								<div id="react-root">${reactString}</div>
							</body>
						</html>`
                );

                const html = Transmit.injectIntoMarkup(template, reactData, [`${webserver}/dist/client.js`]);
                res.type('html').send(html);
            });
        });
    });

    app.listen(port, () => {
        console.info('==> ✅  Server is listening');
        console.info('==> 🌎  Go to http://%s:%s', hostname, port);
    });

    if (__DEV__) {
        if (module.hot) {
            console.log('[HMR] Waiting for server-side updates');

            module.hot.accept('containers/routes', () => {
                routes = require('containers/routes');
            });

            module.hot.addStatusHandler(status => {
                if (status === 'abort') {
                    setTimeout(() => process.exit(0), 0);
                }
            });
        }
    }
} catch (error) {
    console.error(error.stack || error);
}
