import initStoryshots from '@storybook/addon-storyshots';

const mockon = jest.fn();

const mockMap = jest.fn(() => ({
  on: mockon
}));

jest.mock('mapbox-gl', () => ({
  Map: mockMap
}));

initStoryshots({
  configPath: '.storybook',
  storyKindRegex:/^((?!.*?DontTest).)*$/
});
