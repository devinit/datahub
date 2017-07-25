const express = require('express');
const path = require('path');
const { parse } = require('url');
const compression = require('compression');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4444;

app.prepare().then(_ => {
  const server = express();

  server.use(compression());

  server.use(express.static('public'));
  // serve service worker
  server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')));

  server.get('*', (req, res) => handle(req, res));

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> App running on  http://localhost:${PORT}`);
  });
});
