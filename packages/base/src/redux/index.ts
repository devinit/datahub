import { createStore, combineReducers, compose } from 'redux';
// import { process } from '../types';

let reduxStore;

let devtools = f => f;

const initDevTools = () => {
    if (process.env.NODE_ENV === 'development'
    && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
        devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__();
    }
};

// Get the Redux DevTools extension and fallback to a no-op function
function create({reducers, initialState}) {
  return createStore(
    combineReducers({
      // Setup reducers
      ...reducers
    }),
    initialState, // Hydrate the store with server-side data
    compose(
      devtools,
    ),
  );
}
interface IreduxArgs<T, S> {
    reducers: T;
    initialState: S;
}
export function initRedux<T, S>(args: IreduxArgs<T, S>) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) return create(args);
  // Reuse store on the client-side
  if (!reduxStore) reduxStore = create(args);

  if (process.browser && reduxStore) initDevTools();

  return reduxStore;
}
