import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import localForage from 'localforage';
import packageJson from 'package.json';
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
function makeStorePersist(store) {
  return new Promise((resolve, reject) => {
    // TODO: Purge store if new install, check local storage
    return persistStore(store, {
      storage: localForage,
      whitelist: ['apollo'] }, (err, cachedStore) => {
        if (err) {
          console.error('persisting store error: ', err);
          reject(store);
        }
        if (cachedStore) resolve(cachedStore);
      });
  });
}
export function clientCachingHandling(store) {
  if (!localStorage) return false; // we are in an old browser or on server
  const storedVersion = localStorage.getItem('version');
  if (!storedVersion || storedVersion !== packageJson.version) {
    // set new version
    localStorage.setItem('version', packageJson.version);
    // we have a new app version lets purge the store
    return persistStore(store).purge();
  }
  return makeStorePersist(store);
}

export function initRedux(apollo, initialState) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return create(apollo, initialState);
  // Reuse store on the client-side
  if (!reduxStore) reduxStore = create(apollo, initialState);
  return reduxStore;
}
