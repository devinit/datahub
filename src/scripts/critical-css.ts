/**
 * Generates critical css for each page
 * This is esential for avoiding flash of un styled contents in nextjs 5
 * since it seems the style links are not rendered before everything else
 */
// import * as fs from 'fs-extra';
// import * as puppeteer from 'puppeteer';
// import * as prettier from 'prettier';
// import * as csso from 'csso';
// import * as Purgecss from 'purgecss';

// interface IPurgeCSSResult {
//     file: string;
//     css: string;
// }
// const getCss = async (url): Promise<IPurgeCSSResult[]> => {
//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto(url);
//         const html = await page.content();
//         const purgecss = new Purgecss({
//             content: [
//                 {
//                     raw: html,
//                     extension: 'html'
//                 }
//             ],
//             css: ['static/semantic.min.css'],
//             fontFace: true,
//         } as Purgecss.Options);
//         await browser.close();
//         return purgecss.purge() as IPurgeCSSResult[];
//     } catch (err) {
//         console.error('error: ', err);
//         throw err;
//     }

// };

// const cssModule = (css: IPurgeCSSResult[]): string =>
//   `/* tslint:disable */
//   // this file is auto generated
//   // it contains critical / above the fold css of the site
//   // its imported in the page/_document and inline there
//   \n
//   export default ${JSON.stringify(css)};
//   \n
// `;

// const main = async (siteUrl: string, filePath) => {
//     const css = await getCss(siteUrl);
//     const ast = csso.syntax.parse(css[0].css);
//     const compressedAst = csso.compress(ast, {comments: false}).ast;
//     const minifiedCss = csso.syntax.generate(compressedAst);
//     const content = cssModule(minifiedCss);
//     await fs.writeFile(filePath,  prettier.format(content, { singleQuote: true }));
//     console.log('success');
// };

// // Make sure the site is running and accessible at that provided site url
// if (process.env.NODE_ENV !== 'test') {
//     [
//         {path: '/critical', file: 'critical'},
//         // {path: '/country/uganda', file: 'countryProfile'},
//         // {path: '/unbundling-aid', file: 'unbundling'}
//     ].forEach(({path, file}) => {
//       main(`http://localhost:3000${path}`, `src/critical-css/${file}.ts`);
//     });
//   }
