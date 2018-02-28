/**
 * Generates critical css for each page
 * This is esential for avoiding flash of un styled contents in nextjs 5
 * since it seems the style links are not rendered before everything else
 */
// import * as fs from 'fs-extra';
// import * as Purgecss from 'purgecss';

// const purgeCss = new Purgecss({
//     content: [
//         {
//             raw: '<html><body><div class="app"></div></body></html>',
//             extension: 'html'
//         }
//     ],
//     css: ['**/static/semantic.min.css']
// });

// const result = purgecss.purge();
