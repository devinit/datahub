import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import localForage from 'localforage';
// import type {State, Action} from './reducers';
import {app, apolloWrapper} from './reducers';

let reduxStore = null;

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f;
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

function create(apollo, initialState) {
  return createStore(
    combineReducers({
      // Setup reducers
      ...app,
      apollo: apolloWrapper(apollo.reducer()),
    }),
    initialState, // Hydrate the store with server-side data
    compose(
      applyMiddleware(apollo.middleware()), // Add additional middleware here
      devtools
    ),
  );
}

export async function makeStorePersist(store) {
  const storage = await localForage.config({
    driver: localForage.INDEXEDDB,
    name: 'datahub-v2',
    version: 1.0,
    storeName: 'datahub', // Should be alphanumeric, with underscores.
    description: 'datahub client cache'
  });
  return new Promise((resolve, reject) => {
    return persistStore(store, {
      storage,
      whitelist: ['apollo'] }, (err, cachedStore) => {
        if (err) {
          console.error('persisting store error: ', err);
          reject(store);
        }
        if (cachedStore) resolve(cachedStore);
      });
  });
}

export function initRedux(apollo, initialState) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return create(apollo, initialState);
  // Reuse store on the client-side
  if (!reduxStore) reduxStore = create(apollo, initialState);
  return reduxStore;
}
