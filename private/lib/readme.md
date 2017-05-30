## Offline & Client cache use pipe line

When app is online for the first time page renders are made on the live server.
The redux-apollo store is initialised on the server, added to redux state and into the app for server side rendering.

When app is online or offline for the nth time on a service worker enabled browser, where it has been viewed before.
The page render occurs entirely on the client as it will be constructed from the service worker cache.
This leads to 2 scenarios.

For pages with redux store state, we will hydrate an already persisted

service worker caches page visits.
While on the client we hydrate a persisted cached redux store saving as from need to make API requests


# Issues
Our app is server rendered, and a page first renders with all the necessary mark up.
If you hydrate a persisted store, the page will flicker due to the state component connection.
- Work around, only persist apollo state
- for components that may be forced to re-render use component did mount to stop them from rendering

subsequent calls for apollo data will be served by the store.

Approach 2

- Intercepent apollo 

Approach 3

- Do away with apollo and cache API requests when they return so that they are serviceable by service worker cache

-
