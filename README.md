# React Isomorphic Starterkit

Isomorphic starterkit with server-side React rendering using
[npm](https://www.npmjs.com),
[koa](http://koajs.com),
[webpack](https://webpack.github.io/),
[babel](http://babeljs.io),
[react](https://facebook.github.io/react),
[react-router](https://github.com/rackt/react-router),
[react-transform-hmr](https://github.com/gaearon/react-transform-hmr),
[react-transmit](https://github.com/RickWong/react-transmit),
[react-inline-css](https://github.com/RickWong/react-inline-css)

## Fork compared to upstream

This is based on
[RickWong/react-isomorphic-starterkit](https://github.com/RickWong/react-isomorphic-starterkit),
with (currently) mostly stylistic changes:

  * `lf` line-endings, instead of `crlf`
  * 4 space indent, instead of tab
  * `'single quotes'` for js string literals, instead of `"double quotes"`
  * Travis CI build: [![Build Status](https://travis-ci.org/hugojosefson/react-isomorphic-starterkit.svg?branch=feature%2Frefactor)](https://travis-ci.org/hugojosefson/react-isomorphic-starterkit)

## Features

- Fully automated toolchain with npm run scripts
- React 0.14 + React Router 1.0 on the client and server
- Babel 6 automatically compiles ES2015 + ES7 draft
- Webpack HMR for instant server updates
- React Transform HMR for instant client updates
- React Transmit to preload on server and hydrate client
- InlineCss-component for styling components

It just works out-of-the-box.

## Installation

Development

```bash
git clone https://github.com/hugojosefson/react-isomorphic-starterkit.git
cd react-isomorphic-starterkit

npm install
npm run watch     # Yes, ONE command for both server AND client development!
```

Production

```bash
npm run build
npm run start
```

## Usage

Run `npm run watch` in your terminal and play with `views/Main.js` to get a feel of
the server-side rendering and client-side hot updates.
