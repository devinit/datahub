import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import { app, initialState } from 'lib/reducers';

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f;
if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__();
}

export interface Istore {
  initialState: any;
  reducers: any;
}

export const store = ({reducers, initialState}: Istore) =>
  createStore(combineReducers({ ...reducers }), { app: initialState }, devtools);

const withReduxProvider = ({reducers, initialState}: Istore) => {
  return storyFn => {
    return (
      <Provider store={store({reducers, initialState})}>
        {storyFn()}
      </Provider>
    );
  };
};

export default withReduxProvider;
