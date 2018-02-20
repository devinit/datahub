[![Build Status](https://travis-ci.org/devinit/datahub.svg?branch=master)](https://travis-ci.org/devinit/datahub)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/73e243adf7f946208ae9bc8f892ed618)](https://www.codacy.com/app/epicallan/datahub?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=devinit/datahub&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://gemnasium.com/badges/github.com/devinit/datahub.svg)](https://gemnasium.com/github.com/devinit/datahub)


Data hub refactored with lerna (monorepo) & typescript

Installation
-------------

```
npm install # in root
npm install -g lerna # this is a lerna monorepo
lerna bootstrap #install dependencies in all packages

```

Usage examples

```
lerna run storybook --scope @devinit/dh-ui --stream # running storybook in ui package
lerna run lint --scope @devinit/dh-base  # linting base package
lerna run build --scope @devinit/dh-base # building base package
```

TODO:

_________


- [ ] Make tsconfigs & tslints shareable
- [ ] Maybe replace redux with [unistore](https://github.com/developit/unistore)
- [ ] Use [greenlet](https://github.com/developit/greenlet) for webworkers
- [ ] Explore [purgecss](https://github.com/FullHuman/purgecss) for css optimisation
- [ ] Explore [reactpot](https://github.com/reactopt/reactopt) for further perf