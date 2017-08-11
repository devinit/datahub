// server precache module
const fetch = require('isomorphic-fetch');
const pagesToPreCache = require('./pages');

const PORT = process.env.PORT || 4444;

const preCache = () => {
  const homeLink = `http://localhost:${PORT}`;
  pagesToPreCache.forEach(link => {
    setTimeout(() => {
      fetch(`${homeLink}${link}`)
        .then(response => {
          if (response.status === 200) return true;
          // if (response.status === 200) return console.info(`${link} is now cached`);
          return console.error(`${link} was not found or bad response`);
        })
        .catch(error => console.error(error.message));
    }, 20000);
  });
};

preCache();
