import { configure } from '@storybook/react';
import 'semantic.min.css';
import 'di-charts.min.css';
import 'mapbox-gl.css';

const req = require.context('../components', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}


configure(loadStories, module);
