const express = require('express');
const path = require('path');
const { parse } = require('url');
const compression = require('compression');
const nextRoutes = require('next-routes');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4444;

const routes = nextRoutes();

routes.add('country', '/country/:slug');

const countryHandler = routes.getRequestHandler(app);

app.prepare().then(_ => {
  const server = express();

  server.use(compression());

  server.use(express.static('public'));
  // serve service worker
  server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')));

  // server.get('/data/:id', (req, res) => mapDataHandler(req, res));

  server.get('*', (req, res) => {
    if (req.path.includes('country')) return countryHandler(req, res);
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> App running on  http://localhost:${PORT}`);
  });
});
