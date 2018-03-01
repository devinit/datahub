import * as React from 'react';
import { Provider} from 'react-redux';
import { initRedux } from '../redux';

const withReduxProvider = () => {
  return storyFn => {
    return (
      <Provider store={initRedux()}>
        {storyFn()}
      </Provider>
    );
  };
};

export default withReduxProvider;
