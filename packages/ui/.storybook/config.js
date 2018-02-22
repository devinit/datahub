import { configure } from '@storybook/react';
import '../static/semantic.min.css';
import '../static/di-charts.min.css';
import '../static/mapbox-gl.min.css';

const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const mockedRouter = {
  prefetch: () => {},
};

configure(loadStories, module);
