// server precache module
const countriesData = require('../../components/organisms/CountrySearchInput/data');
const fetch = require('isomorphic-fetch');
const pagesToPreCache = require('./pages');

const PORT = process.env.PORT || 4444;

const preCache = () => {
  const homeLink = `http://localhost:${PORT}`;
  const countrySlugs = countriesData.countries.map(country => `/country?id=${country.slug}`);
  // for batch precaching of country pages
  const preCacheList = pagesToPreCache.concat(countrySlugs);
  preCacheList.forEach(link => {
    setTimeout(() => {
      fetch(`${homeLink}${link}`)
        .then(response => {
          if (response.status === 200) return console.info(`${link} was found and is now cached`);
          return console.error(`${link} was not found or bad response`);
        })
        .catch(error => console.error(error.message));
    }, 10000);
  });
};

preCache();
