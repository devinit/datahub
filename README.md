[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/devinit/datahub)
[![Build Status](https://travis-ci.org/devinit/datahub.svg?branch=master)](https://travis-ci.org/devinit/datahub)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/73e243adf7f946208ae9bc8f892ed618)](https://www.codacy.com/app/epicallan/datahub?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=devinit/datahub&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/devinit/datahub/branch/master/graph/badge.svg)](https://codecov.io/gh/devinit/datahub)
[![Dependency Status](https://gemnasium.com/badges/github.com/devinit/datahub.svg)](https://gemnasium.com/github.com/devinit/datahub)


# DataHub - Next

This is just primarily the frontend part of the DataHub, to keep things modular the backend will be in a separate repo.

## How to use

--------

Install it and run:

```bash
npm install --ignore-scripts && npm install -g flow-typed
or
yarn  --ignore-scripts && npm install -g flow-typed
npm run dev
```

## Development guidelines

-----------

Create a branch for which ever issue you are working on. After you are done create and submit a pull request to the dev branch.
Before merging your pull request make sure the build passes on travis-ci
if you have linting errors consider running

```
npm run format // formats entire project
or
npm run format-p  // formats singele page; with the correct filename in the command
```

## [Building on top of next.js](https://github.com/zeit/next.js)


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

If the above options arent viable consider generating a stub for the types as below
```
flow-typed create-stub @devinit/charts@1.1.4
```



## State management and data fetching with [apollo](https://github.com/apollographql/apollo-client) and [redux](https://github.com/reactjs/redux)
- Apollo graphql integration takes away a lot of data fetching boilerplate commonly found in react apps.
- Apollo graphql also allows for efficient data fetching through fewer network requests.

## [Atomic react design component development](http://bradfrost.com/blog/post/atomic-web-design/) with [storybook](https://storybooks.js.org/)

## Testing with [Jest](https://facebook.github.io/jest/)

## Styling with [semantic UI](https://github.com/Semantic-Org/Semantic-UI-React) and [glamorous](https://github.com/paypal/glamorous)

## [Offline access (PWA) with service worker](https://developers.google.com/web/progressive-web-apps/) and [localForage](https://github.com/localForage/localForage)

## On Maps

--------

We use a mapbox-gl

## Deployment for production
cd into root of the project
``` bash
  $ docker build -t datahub-2 .
  $ docker run -it -d -p 7777:9090 --name datahub-2-app datahub-2
```

## Graphql types

Package.json has a ```qql-schema``` command in which you put a graphql api endpoint. This endpoint is used in the command to create a schema.json file which is used by the ```gql-flow``` command to create flow types for your graphql queries. The types are outputted
in ```private/types/schema.flow.js```

## Pulling API data into the project as Js modules (json) data.

In order to reduce on unnecessary API calls of data that rarelly changes, we have a tool that queries APIs and dumps their data into the project.
> ```npm run pull``` will return page data and some refrence data eg global map themes and place it in various files in the project </br>
> TODO: ```npm run visbox``` will get you all visbox data for chart configurations</br>
 These commands are run at new deployments by docker.


## Known development issues / incompartibilities

----------

- Currently Updating eslint-plugin-react to 7.1.0  &  eslint-plugin-jsx-a11y to 6.0.2 will break linting
- Currently dont add react-apollo flow types. They have an issue that needs to be corrected
- Flow > 0.52 has quite a number of breaking changes, dont upgrade yet.
- latest react-semantic ui lib breaks tooltip tests coz it uses a modal which has testing issues.
- Dont upgrade apollo-codegen to 0.16 it will break liniting --> _Makes inner array types optional_ [submitted an issue about it](https://github.com/apollographql/apollo-codegen/issues/225)

## Development environment / notes / guidelines

--------
- we use package.json for some configs, for instance the api link is in package.json's config key.
- the version number in package.json is used to determine whether to destroy the client cache or reuse it. Bump it up if you want users to start on a clean slate
- module resolution is handled by babel not webpack this is a next.js constraint
- storybook has its own webpack config file you may need to update it where required. It also has a module resolution config.
- Advised to use any modern linux OS or MacOS
- Advised to use NodeJs > 7

## List of custom changes to watch out for in semantic ui

- Disabled min width in dropdown via ``.ui.selection.dropdown .menu &&  .ui.scrolling.dropdown .menu`` styles in private/semantic/src/definitions/modules/dropdown.less
- We have a couple of changes in the default theme folder that should be carried over to the sites folder
