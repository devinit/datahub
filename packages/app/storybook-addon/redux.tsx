import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider} from 'react-redux';
import { app, initialState } from '../redux/reducers';

let devtools = f => f;
if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__();
}

export const store = createStore(combineReducers({ ...app }), { app: initialState }, devtools);

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
