## Custom Backend for NetlifyCMS

[![Build Status](https://img.shields.io/travis/ADARTA/netlify-cms-components/master.svg?style=flat-square)](https://travis-ci.org/ADARTA/netlify-cms-components)
[![](https://img.shields.io/npm/v/netlify-cms-backend-fs.svg?style=flat-square)](https://www.npmjs.com/package/netlify-cms-backend-fs)

***Notes:*** 

- This library is still in beta!
- Version 0.4.0 is a breaking change 🐉.
- Version 0.4.0+ is only compatible with builds of `netlify-cms` when [PR (#2141)][5] lands.
This library will require `netlify-cms` as a reusable component to better promote
better practices for a single instance of React. The starter here gives an example.
- This is a backend library for NetlifyCMS proposed for file system testing locally during development.
- Handy for testing your config files.

To use:

To load dependencies for build

```bash
yarn add netlify-cms-backend-fs --dev
```

or

```bash
npm install netlify-cms-backend-fs --save-dev
```
## Parts of this package

Backend library bundles exist in `dist` directory.

- `dist/index.js` can be used for global access to `FileSystemBackendClass` and is a `umd` build to use directly as a component see example in `netlify-cms-starter`

Express server middleware is in the `dist/fs` directory.

- `dist/fs/index.js` (not bundled) has the node script to be used as middleware for webpack devServer or express server to create the api for development.

## How to register with CMS on a static page locally

  - Copy the package `dist/index.js` script bundle file into your cms location (maybe `backend-fs.js`).
  - Change the `index.html` page to use the backend as in the example below
  - Register the backend Class to the CMS as shown below
  - Change the `config.yml` backend to `backend: file-system` or the name you registered
  - [Webpack] Add devServer middleware to expose the `/api` path for the file-system API
  - [Stand Alone Server] Create an express server (example coming soon) to host the `/api` endpoint

### Add script and register in your CMS page

**_NOTE:_** v4.x of this library will not work without a version of `netlify-cms` that exports React (see notes at the top of this document).

```html
<head>
  ...
</head>
<body>
  <script>
    /**
     * Global flag to initialize the CMS manually after registering backend and widgets.
     * In most cases, the CMS will render prior to the backend script load which could cause errors.
     * This will make sure the backend is registered prior to the loading of the CMS.
     */
    CMS_MANUAL_INIT = true; 
  </script>
  <script src="https://unpkg.com/react@16.8.4/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.8.4/umd/react-dom.development.js"></script>
  <script type="text/javascript" src='netlify-cms-app.js'></script>
  <script type="text/javascript" src="backend-fs.js"></script>
  <script>
    var CMS = NetlifyCmsApp;
    CMS.registerBackend("file-system", FileSystemBackendClass);
    CMS.init(); // Manually starts the CMS on the page after the registration of the backend
  </script>
</body>
```

OR

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NetlifyCMS</title>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Netlify CMS -->
    <script src="https://unpkg.com/react@16.8.4/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.8.4/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/netlify-cms-app@2.9.0/dist/netlify-cms-app.js"></script>
    <script>
      var CMS = NetlifyCmsApp;
      CMS.registerBackend("file-system", FileSystemBackendClass)
      CMS.init(); // Manually starts the CMS on the page after the registration of the backend
    </script>
  </body>
</html>
```

### Start your devServer using the middleware scripts

[Starters Coming Soon] or you can see the [netlify-cms-starter][1] for a create-react-app example.

## Dependencies

This library requires you to be using [NetlifyCMS][3] v2.x or above (see notes at the top).

***Recommendation:*** If you are looking to extend NetlifyCMS and run a local file-system setup for development, use the [netlify-cms-react-example][4] starter project. It implements the backend as a component and bundles to a custom CMS deployment for your project.

***WARNING:*** This is a development tool. It can safely be used in a repository locally, since it is not used in production code. Commit and push changes before you start using.

Don't forget: code like you are on 🔥

The Netlify Logo is Copyright of [Netlify][2] and should not be used without their consent.

[1]: https://github.com/ADARTA/netlify-cms-components/tree/master/packages/netlify-cms-starter
[2]: https://www.netlify.com/
[3]: https://www.netlifycms.org/
[4]: https://github.com/adarta/netlify-cms-react-example
[5]: https://github.com/netlify/netlify-cms/pull/2141
