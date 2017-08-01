const express = require('express');
const path = require('path');
const { parse } = require('url');
const compression = require('compression');
// const nextRoutes = require('next-routes');
const LRUCache = require('lru-cache');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4444;

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 200,
  maxAge: 1000 * 60 * 60 * 24 * 30 * 6 // 6 months
});

// const routes = nextRoutes();

// routes.add('country', '/country/:slug');

// const countryHandler = routes.getRequestHandler(app);

const renderAndCache = (req, res, pagePath, queryParams) => {
  const key = req.url;

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`);
    return res.send(ssrCache.get(key));
  }

  // If not let's render the page into HTML
  return app.renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      // Let's cache this page
      console.log(`CACHE MISS: ${key}`);
      ssrCache.set(key, html);
      res.send(html);
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
};

app.prepare().then(_ => {
  const server = express();

  server.use(compression());

  server.use(express.static('public'));
  // serve service worker
  server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')));

  // Use the `renderAndCache` utility defined below to serve pages
  server.get('/', (req, res) => {
    renderAndCache(req, res, '/');
  });
  server.get('/spotlight-on-uganda', (req, res) => {
    renderAndCache(req, res, '/spotlight-on-uganda');
  });
  server.get('/unbundling-aid', (req, res) => {
    renderAndCache(req, res, '/unbundling-aid');
  });
  server.get('/country/:id', (req, res) => {
    const queryParams = { id: req.params.id };
    renderAndCache(req, res, '/country', queryParams);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> App running on  http://localhost:${PORT}`);
  });
});
