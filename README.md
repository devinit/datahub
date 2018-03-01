[![Build Status](https://travis-ci.org/devinit/datahub.svg?branch=master)](https://travis-ci.org/devinit/datahub)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/73e243adf7f946208ae9bc8f892ed618)](https://www.codacy.com/app/epicallan/datahub?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=devinit/datahub&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://gemnasium.com/badges/github.com/devinit/datahub.svg)](https://gemnasium.com/github.com/devinit/datahub)
[![codecov](https://codecov.io/gh/devinit/datahub/branch/master/graph/badge.svg)](https://codecov.io/gh/devinit/datahub)

Installation
-------------

```
 npm install --ignore-scripts

```


TODO:

_________

- [ ] Maybe replace redux with [unistore](https://github.com/developit/unistore)
- [x] Use [greenlet](https://github.com/developit/greenlet) for webworkers --> didnt pan out well
- [ ] Explore [purgecss](https://github.com/FullHuman/purgecss) for css optimisation
- [ ] Explore [reactpot](https://github.com/reactopt/reactopt) for further perf


Important Points / guides

------------------------

- Develop from a unix OS (MacOs , ubuntu etc). I dont plan to add windows support.
- Prefer to use vscode, it has very good typescript support.

-  We have the graphql queries in this repo, but we need the resulting types that can be generated from them for use in the UI package. We thus have a command `` npm run types `` that copies those types over

-  The static folder is a composition of assets in the UI package & those only native to the app package.
Use `` npm run cp-assets `` to sync the assets in app package with those in UI package

- We are building on top of next.js see next.config.js for configs.

- `` npm run build-fragment `` to build out a fragment json for grapqhl union types

- we use npm config variables to prefill some global constants such as the API et la [see for more](http://www.marcusoft.net/2015/08/npm-scripting-configs-and-arguments.html#npm-configuration)

- In dev mode we run a nodemon process, it sometimes doesnt die when you cntrl-c. You could use
```lsof -i tcp:4444 ``` to find its PID and then kill it with ``` kill -9 <PID> ```.



Pain Points / issues
--------------

- Currently stack with npm instead of yarn. Yarn installs seem to fail. I havent looked deeply into this.

