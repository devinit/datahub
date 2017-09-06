const express = require('express');
const compression = require('compression');
const LRUCache = require('lru-cache');
const next = require('next');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4444;

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 300,
  maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
});

const renderAndCache = (req, res, pagePath, queryParams) => {
  const key = req.url;
  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key) && process.env.NODE_ENV === 'production') {
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


app.prepare().then(() => {
  const server = express();

  server.use(compression());

  server.use(express.static('public'));

  // serve service worker // currently not working
  // server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')));
  [
    '/unbundling-aid',
    '/unbundling-other-flows',
    '/country-profiles',
    '/where-are-the-poor'
  ].forEach(link => {
    server.get(link, (req, res) => {
      renderAndCache(req, res, link);
    });
  });

  ['/', 'spotlight-on-uganda'].forEach(link => {
    server.get(link, (req, res) => {
      const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
      const queryParams = { state };
      renderAndCache(req, res, link, queryParams);
    });
  });
  // TODO: fix me, add this to country route
  server.get('/uganda/:id', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const queryParams = { id: req.params.id, state};
    renderAndCache(req, res, '/uganda', queryParams);
  });

  server.get('/country/:id', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const queryParams = { id: req.params.id, state};
    renderAndCache(req, res, '/country', queryParams);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> App running on http://localhost:${PORT}`);
  });
});
