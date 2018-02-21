## The front facing datahub app package

-------------------------------


Important Notes / guides arround various npm commands & gotchas

-----------------------

-  We have the graphql queries in this repo, but we need the resulting types that can be generated from them for use in the UI package. We thus have a command `` lerna run types `` that copies those types over

-  The static folder is a composition of assets in the UI package & those only native to the app package.
Use `` lerna run cp-assets `` to sync the assets in app package with those in UI package

- We are building on top of next.js see next.config.js for configs.

- `` lerna run build-fragment `` to build out a fragment json for grapqhl union types
