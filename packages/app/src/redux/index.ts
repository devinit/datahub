import { createStore, combineReducers, compose } from 'redux';
import {process} from '@devinit/dh-base/lib/types';
import {app, initialState} from './reducers';

let reduxStore;

let devtools = f => f;

const initDevTools = () => {
    if (process.env.NODE_ENV === 'development'
    && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
        devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__();
    }
};

// Get the Redux DevTools extension and fallback to a no-op function
function create(_initialState) {
  return createStore(
    combineReducers(app),
    _initialState, // Hydrate the store with server-side data
    compose(
      devtools,
    ),
  );
}

export function initRedux(_initialState?: any) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return create(_initialState || initialState);
  // Reuse store on the client-side
  if (!reduxStore) reduxStore = create(_initialState || initialState);

  if (process.browser && reduxStore) initDevTools();

  return reduxStore;
}
