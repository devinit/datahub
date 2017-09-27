// prerenders current datahub pages for use with in this app

const { launchChrome, render} = require('usus');
const fs = require('fs-extra');

const run = async () => {
  const chrome = await launchChrome();
  const page = await render('http://data.devinit.org/#!/post/oda-donor', {
    chromePort: chrome.port,
    inlineStyles: true
  });
  await fs.writeFile('test.html', page);
  await chrome.kill();
};

if (process.env.NODE_ENV !== 'test') run();
