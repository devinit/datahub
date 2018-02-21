// gets external / vendor css and dumbps into public folder
// this is because next.js doesnt support importing css files into modules

const fs = require('fs-extra');
const path = require('path');

const filesMap = [
  {
    current: path.resolve(__dirname, '../../node_modules/@devinit/charts/dist/di-charts.min.css'),
    new: path.resolve(__dirname, '../../public/css/di-charts.min.css')
  },
  {
    current: path.resolve(__dirname, '../../node_modules/mapbox-gl/dist/mapbox-gl.css'),
    new: path.resolve(__dirname, '../../public/css/mapbox-gl.min.css')
  }
];

const run = () => {
  filesMap.forEach(obj => {
    fs.copy(obj.current, obj.new)
      .then(() => console.log('success!'))
      .catch(err => console.error(err));
  });
};

if (process.env.NODE_ENV !== 'test') run();
