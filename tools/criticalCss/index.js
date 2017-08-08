// @flow
import {render} from 'usus';
import {minify} from 'csso';
import fs from 'fs-extra';

const getCss = (url: string): Promise<string> => {
  return render(url, {
    formatStyles: (styles: string): Promise<string> => {
      return minify(styles).css;
    },
    extractStyles: true
  });
};
const cssModule = (css: string): string =>
  `/* eslint-disable */
  // this file is auto generated
  // it contains critical / above the fold css of the site
  // its imported in the page/_document and inline there
  \n
  module.exports = \`${css}\`;
  \n
`;

const main = async (siteUrl: string, filePath) => {
  const css = await getCss(siteUrl);
  const content = cssModule(css);
  fs.writeFile(filePath, content);
};
// Make sure the site is running and accessible at that provided site url
if (process.env.NODE_ENV !== 'test') {
  main('http://212.71.254.23:9999', 'private/criticalCss/index.js');
}
