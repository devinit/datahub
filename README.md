[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/devinit/datahub)
[![Build Status](https://travis-ci.org/devinit/datahub.svg?branch=master)](https://travis-ci.org/devinit/datahub)
![Code Climate](https://codeclimate.com/github/devinit/datahub.svg)
[![codecov](https://codecov.io/gh/devinit/datahub/branch/master/graph/badge.svg)](https://codecov.io/gh/devinit/datahub)
[![Dependency Status](https://gemnasium.com/badges/github.com/devinit/datahub.svg)](https://gemnasium.com/github.com/devinit/datahub)


# DataHub - Next

This is just primarily the frontend part of the DataHub, to keep things modular the backend will be in a separate repo.

## How to use

--------

Install it and run:

```bash
yarn --ignore-scripts & npm install -g flow-typed
npm run dev
```
__[why we have an ignore-scripts option on yarn install](https://github.com/Semantic-Org/Semantic-UI/issues/3533)__

## Development guidelines

-----------

Create a branch for which ever issue you are working on. After you are done create and submit a pull request to the master branch.
Before merging your pull request make sure the build passes on travis-ci
if you have linting errors consider running

```
npm run format
```

## [Buiding on top of next.js](https://github.com/zeit/next.js)


- The file system is your routes. Drop a new file in pages and it becomes a route
- Automatic code splitting at route level
- Does away with a lot of tooling configuration boilerplate

[if you are wondering why the file structure is so flat, checkout this linked next.js issue](https://github.com/zeit/next.js/issues/91)

## Flow for types

[On why we chose flow for types](https://djcordhose.github.io/flow-vs-typescript/2016_hhjs.html)

 #### Making flow work well with external libraries
In oder to get the best out of flow we need type information for external libraries.
Flow helps with it through the [flow-typed](https://github.com/flowtype/flow-typed) tool
  >
  - ```$ npm install -g flow-typed``` (if not installed already)
  - ```$ flow-typed install ``` -- this installs all the flow type definitions relative to the project
  - when you add a new Dependency add its types as follows
  -  ```$ flow-typed install rxjs@5.0.x ```

There are dependencies for which flow-typed has no definitions for those have a look at [flowgen](https://github.com/joarwilk/flowgen) which offers away of transpiling typescript definitions to flow definitions.



## State management and data fetching with [apollo](https://github.com/apollographql/apollo-client) and [redux](https://github.com/reactjs/redux)
- Apollo graphql integration takes away a lot of data fetching boilerplate commonly found in react apps.
- Apollo graphql also allows for efficient data fetching through fewer network requests.

## [Atomic react design component development](http://bradfrost.com/blog/post/atomic-web-design/) with [storybook](https://storybooks.js.org/)

## Testing with [Jest](https://facebook.github.io/jest/)

## Styling with [semantic UI](https://github.com/Semantic-Org/Semantic-UI-React) and [glamorous](https://github.com/paypal/glamorous)

## [Offline access (PWA) with service worker](https://developers.google.com/web/progressive-web-apps/) and [localForage](https://github.com/localForage/localForage)

## On Maps

--------

We use a mapbox-gl [react wrapper for the maps component](https://github.com/uber/react-map-gl). This wrapper workers best with immutable data structures and thats why we have the [immutable.js dependency](https://facebook.github.io/immutable-js/)
You will be required to add a MapboxAccessToken to your system environment variable to get it working.

## Deployments handled by Now for staging and test previews

--------

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download)):

``` bash
now
```
Ask Allan for latest staging url

## Deployment for production
cd into root of the project
``` bash
  $ docker build -t datahub-2 .
  $ docker run -it -d -p 7777:3333 -p 6002:6002 --name datahub-2-app datahub-2
```

## TODO

---------

- [ ] Reduce service worker pre-cache bundle
- [ ] [Reduce the amount of data we cache with redux persist](https://github.com/apollographql/apollo-client/issues/1600)


## Development environment and notes

--------
- module resolution is handled by babel not webpack this is a next.js constraint
- storybook has its own webpack config file you may need to update it where required
- Advised to use any modern linux OS or MacOS
- Advised to use NodeJs 7 and above

