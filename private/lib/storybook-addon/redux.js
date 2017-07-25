import React from 'react';
import { createStore, combineReducers} from 'redux';
import { Provider} from 'react-redux';
import {app, initialState} from 'lib/reducers';

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f;
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

export const store = createStore(combineReducers({...app}), {app: initialState}, devtools);

const withReduxProvider = () => {
  return storyFn => {
    return (
      <Provider store={store}>
        {storyFn()}
      </Provider>
    );
  };
};

export default withReduxProvider;
