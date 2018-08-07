// gets external / vendor css and dumbps into static folder
// this is an optimisation pass, it aslo allos us to preload these files separately instead of
// having them as part of the site wide css

import * as fs from 'fs-extra';
import * as csso from 'csso';
import * as path from 'path';

const filesMap = [
  {
    current: path.resolve(__dirname, '../../node_modules/@devinit/charts/dist/di-charts.min.css'),
    new: path.resolve(__dirname, '../../static/di-charts.min.css')
  },
  {
    current: path.resolve(__dirname, '../../node_modules/mapbox-gl/dist/mapbox-gl.css'),
    new: path.resolve(__dirname, '../../static/mapbox-gl.min.css')
  }
];

const compressCSS = async (file: string): Promise<string> => {
  const content = await fs.readFile(file, { encoding: 'utf8' });
  const ast = csso.syntax.parse(content);
  const compressedAst = csso.compress(ast, { comments: false }).ast;

  return csso.syntax.generate(compressedAst);
};

const main = async () => {
  filesMap.forEach(async (obj) => {
    const css = await compressCSS(obj.current);
    await fs.writeFile(obj.new, css);
    console.log('success!');
  });
};

if (process.env.NODE_ENV !== 'test') { main(); }
