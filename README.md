# AGeorgeDev

![Sanity](https://github.com/bassoGeorge/a-george-dev/actions/workflows/tests.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c27387d7-a9ff-478a-a01d-a5f9efaa29f4/deploy-status)](https://app.netlify.com/sites/polite-conkies-0a96bd/deploys)

The one mono-repo for all my website and connected applications

### Commands

#### Make a ts lib

```shell
nx g @nrwl/js:lib --buildable=true --bundler=vite <name>
```

#### Make a React lib

```shell
nx g @nrwl/react:lib <name>
```

with no css and vite bundler.

after this, update the .eslintrc to pick up the ts eslint
