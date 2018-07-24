import { Store, combineReducers, compose, createStore } from 'redux';
import { IProcess } from '../components/types';
import { State, app, initialState } from './reducers';

declare var process: IProcess;

let devtools = f => f;
const DEFAULT_KEY = '__NEXT_REDUX_STORE__';

const initDevTools = () => {
    if (process.env.NODE_ENV === 'development'
    && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
        devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__();
    }
};

// Get the Redux DevTools extension and fallback to a no-op function
function create(state): Store<State> {
  return createStore(
    combineReducers({ app }),
    { app: state }, // Hydrate the store with server-side data
    compose(devtools)
  );
}

export function initRedux(state?: any): Store<State> {
  if (process.browser) { initDevTools(); }
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(state || initialState);
  }
  // Reuse store on the client-side
  if (!window[DEFAULT_KEY]) {
      window[DEFAULT_KEY] = create(state || initialState);
  }

  return window[DEFAULT_KEY];
}
