const express = require('express');
const path = require('path');
const { parse } = require('url');
const compression = require('compression');
const LRUCache = require('lru-cache');
const fetch = require('isomorphic-fetch');
const next = require('next');
const countriesData = require('./private/components/organisms/CountrySearchInput/data');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4444;
const homeLink = `http://localhost:${PORT}`;

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 200,
  maxAge: 1000 * 60 * 60 * 24 * 30 * 2 // 1 months
});

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

const pagesToPreCache = ['/', '/spotlight-on-uganda', '/unbundling-aid'];

const preCache = () => {
  const countrySlugs = countriesData.countries.map(country => `/country?id=${country.id}`);
  const preCacheList = pagesToPreCache.concat(countrySlugs);
  preCacheList.forEach((link, index) => {
    setTimeout(() => {
      fetch(`${homeLink}${link}`).then(response => {
        if (response.status === 200) return console.info(`${link} was found and is now cached`);
        return console.error(`${link} was not found or bad response`);
      })
      .catch((error) => console.error(error.message));
    }, 10000);
  });
};

app.prepare().then(_ => {
  const server = express();

  server.use(compression());

  server.use(express.static('public'));

  // serve service worker // currently not working
  server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')));

  pagesToPreCache.forEach(link => {
    server.get(link, (req, res) => {
      renderAndCache(req, res, link);
    });
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
    console.log(`> App running on ${homeLink}`);
    if (process.env.NODE_ENV === 'production') preCache();
  });
});
