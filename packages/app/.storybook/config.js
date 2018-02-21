import { configure } from '@storybook/react';
// import Router from 'next/router'
import '../static/semantic.min.css';
import '../static/di-charts.min.css';
import '../static/mapbox-gl.min.css';

const req = require.context('../src', true, /.story.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// const mockedRouter = {
//   prefetch: () => {},
// };

// Router.router = mockedRouter;

configure(loadStories, module);
