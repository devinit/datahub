[![Build Status](https://travis-ci.org/devinit/datahub.svg?branch=master)](https://travis-ci.org/devinit/datahub)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/73e243adf7f946208ae9bc8f892ed618)](https://www.codacy.com/app/epicallan/datahub?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=devinit/datahub&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://gemnasium.com/badges/github.com/devinit/datahub.svg)](https://gemnasium.com/github.com/devinit/datahub)
[![codecov](https://codecov.io/gh/devinit/datahub/branch/master/graph/badge.svg)](https://codecov.io/gh/devinit/datahub)

Installation
-------------

```
 npm install

```

### Scripts/Commands

- `npm run pull` fetches updates from the CMS and syncs the appropriate project files. Be sure to specify the correct API URL, otherwise
you may pull incorrect data.

TODO:
_________

- [ ] Maybe replace redux with [unistore](https://github.com/developit/unistore)
- [x] Use [greenlet](https://github.com/developit/greenlet) for webworkers --> didnt pan out well
- [ ] Explore [purgecss](https://github.com/FullHuman/purgecss) for css optimisation --> need to carry out some tests
- [ ] Explore [reactpot](https://github.com/reactopt/reactopt) for further perf

Important Points / guides

------------------------

- Develop from a unix OS (MacOs , ubuntu etc). I dont plan to add windows support.

- Prefer to use vscode, it has very good typescript support.

- We are building on top of next.js see next.config.js for configs.

- `` npm run build-fragment `` to build out a fragment json for grapqhl union types

- we use npm config variables to prefill some global constants such as the API et la [see for more](http://www.marcusoft.net/2015/08/npm-scripting-configs-and-arguments.html#npm-configuration)

- In dev mode we run a nodemon process, it sometimes doesnt die when you cntrl-c. You could use
```lsof -i tcp:4444 ``` to find its PID and then kill it with ``` kill -9 <PID> ```.

## [Atomic react design component development](http://bradfrost.com/blog/post/atomic-web-design/) with [storybook](https://storybooks.js.org/)


Cypress testing
-------
- check out the apps [cypress dashboard here](https://dashboard.cypress.io/#/organizations/dab40b78-b24e-4f1c-913a-0a0b8bd0c71a/projects))
- You need to have run `npm run build:next` before running the cypress-open command. Checkout the [readme file](https://github.com/devinit/datahub/tree/cypress/cypress) in cypress directory for more.



Pain Points / issues
--------------

- Currently stack with npm instead of yarn.
The thing with installing with yarn, is that the charts library will stop working well for some charts. This
may have to do with the way npm installs dependencies vs yarn.

- For some reason cypress tests fail on travis. Temporary measure is to have them run on the git push pre hook.
