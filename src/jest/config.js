const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const packageJSON = require('../../package.json');

Enzyme.configure({ adapter: new Adapter() });

jest.mock('global', () => global);

global.API = process.env.API || packageJSON.config.API;
global.APP_VERSION = packageJSON.version;
global.OLD_DATAHUB_URL = packageJSON.config.OLD_DATAHUB_URL;

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => {
      return Object.assign(result, {[prop]: Object.getOwnPropertyDescriptor(src, prop)});
    }, {});
  Object.defineProperties(target, props);
}

global.window = window;
global.window.URL.createObjectURL = () => {};
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

copyProps(window, global);
