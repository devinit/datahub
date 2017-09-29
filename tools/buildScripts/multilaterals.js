// prerenders current datahub pages for use with in this app
// no longer used!!
const { launchChrome, render} = require('usus');
const fs = require('fs-extra');

const run = async () => {
  ['oda', 'ida', 'EU', 'afdb', 'undp'].forEach(async (path) => {
    try {
      const chrome = await launchChrome();
      const page = await render(`http://data.devinit.org/#!/multilateral/${path}`, {
        chromePort: chrome.port,
        inlineStyles: true
      });
      await fs.writeFile(`public/multilaterals/${path}.html`, page);
      await chrome.kill();
    } catch (error) {
      console.error(error);
    }
  });
};

if (process.env.NODE_ENV !== 'test') run();
