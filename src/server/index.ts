import * as express from 'express';
import * as compression from 'compression';
import * as LRUCache from 'lru-cache';
import * as path from 'path';
import * as next from 'next';
import countriesData from '../components/molecules/SearchInput/global';
import ugData from '../components/molecules/SearchInput/uganda';
import keData from '../components/molecules/SearchInput/kenya';
import navTabsData from '../components/organisms/NavBarTabs/data';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4444;

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 300,
  maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
});

const renderAndCache = async (req, res, pagePath, queryParams?: {[key: string]: any}) => {
  const key = req.url;

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));

    return;
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);

      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
};

app.prepare().then(() => {
  const server = express();

  server.use(compression());

  server.use(express.static('static'));

  server.use('/static', express.static(path.resolve(__dirname, '/static'), {
    maxAge: '365d'
  }));

  // serve service worker // currently not working
  // server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')));
  [
    '/unbundling-aid',
    '/unbundling-other-flows',
    '/country-profiles',
    '/where-are-the-poor',
    '/multilaterals',
    '/methodology',
    '/oda-donor',
    '/poverty'
  ].forEach(link => {
    server.get(link, (req, res) => {
      renderAndCache(req, res, link);
    });
  });

  [ '/', '/spotlight-on-uganda', '/spotlight-on-kenya' ].forEach(link => {
    server.get(link, (req, res) => {
      const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
      const queryParams = { state };
      renderAndCache(req, res, link, queryParams);
    });
  });

  server.get('/global-picture', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const queryParams = { state };

    renderAndCache(req, res, '/', queryParams);
  });
  server.get('/global-picture/:themeId', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const themeId = req.params.themeId;
    const theme = navTabsData.globalPictureThemes.find(globalTheme => globalTheme.id === themeId);
    if (theme && !state.indicator) {
      state.indicator = theme.default_indicator;
    }
    const queryParams = { state };

    renderAndCache(req, res, '/', queryParams);
  });
  server.get('/uganda/:id', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const queryParams = { id: req.params.id, state };
    const isValidCountry = ugData.districts
      .some(distict => distict.name.toLowerCase() === req.params.id);

    return isValidCountry ? renderAndCache(req, res, '/uganda', queryParams) :
      renderAndCache(req, res, '/spotlight-on-uganda');
  });
  server.get('/kenya/:id', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const queryParams = { id: req.params.id, state };
    const isValidCountry = keData.districts
      .some(distict => distict.name.toLowerCase() === req.params.id);

    return isValidCountry ? renderAndCache(req, res, '/kenya', queryParams) :
      renderAndCache(req, res, '/spotlight-on-kenya');
  });
  server.get('/multilateral/:id', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const queryParams = { id: req.params.id, state };
    const isValid = [ 'oda', 'ida', 'EU', 'afdb', 'undp' ]
      .some(multilateral => multilateral === req.params.id);

    return isValid ? renderAndCache(req, res, '/multilateral', queryParams) :
      renderAndCache(req, res, '/multilaterals');
  });
  server.get('/country/:id', (req, res) => {
    const state = req.query && req.query.state ? JSON.parse(req.query.state) : {};
    const isValidCountry = countriesData.countries.some(country => country.slug === req.params.id);
    const queryParams = { id: req.params.id, state };

    return isValidCountry
      ? renderAndCache(req, res, '/country', queryParams)
      : renderAndCache(req, res, '/country-profiles');
  });
  server.get('/critical', (req, res) => {
    return handle(req, res);
  });
  server.get('/_next/*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) { console.error('app server error: ', err); }
    console.log(`> App running on http://localhost:${PORT}`);
  });
});
