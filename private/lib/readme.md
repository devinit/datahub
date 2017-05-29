## Offline & Client cache use pipe line

When app is online for the first time first page renders are made on the live server and the redux-apollo store is added to redux state.

When app is online for an nth time on a service worker enabled browser, the first page render occurs entirely on the client.
While on the client we hydrate a persisted cached redux store saving as from need to make API requests
