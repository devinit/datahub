import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
  configPath: 'private/.storybook',
  storyKindRegex:/^((?!.*?DontTest).)*$/
});
