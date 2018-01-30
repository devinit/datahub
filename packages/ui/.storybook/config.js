import { configure } from '@storybook/react';
import Router from 'next/router'
import 'semantic.min.css';
import '../../public/css/di-charts.min.css';
import '../../public/css/mapbox-gl.min.css';

const req = require.context('../components', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const mockedRouter = {
  prefetch: () => {},
};

Router.router = mockedRouter;

configure(loadStories, module);
