const express = require('express');
const path = require('path');
const { parse } = require('url');
const compression = require('compression');
const nextRoutes = require('next-routes');
const fetch = require('isomorphic-fetch');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4444;

const routes = nextRoutes();

routes.add('country', '/country/:slug');

const countryHandler = routes.getRequestHandler(app);

const mapDataHandler = (req, res) => {
  const mapPath = `http://178.79.185.236:8080/data/${req.params.id}`;
  console.log('map data path', req.params.id);
  return fetch(mapPath)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server for map styles');
      }
      return response.json();
    })
    .then(data => res.send(data))
    .catch(console.error);
};

app.prepare().then(_ => {
  const server = express();

  server.use(compression());

  server.use(express.static('public'));
  // serve service worker
  server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')));

  server.get('/data/:id', (req, res) => mapDataHandler(req, res));

  server.get('*', (req, res) => {
    if (req.path.includes('country')) return countryHandler(req, res);
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> App running on  http://localhost:${PORT}`);
  });
});
