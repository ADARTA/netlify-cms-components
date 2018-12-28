## Custom Backend for NetlifyCMS

***Note:*** This is a backend library for NetlifyCMS proposed for file system testing locally during development. Handy for testing your config files.

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

Backend library exists in `dist` directory.

- `dist/index.js` can be used for global access to `window.FileSystemBackend`
- `dist/fs-backend.js` is a `umd` build to use directly as a component see example in `netlify-cms-starter`

Express server middleware is in the `dist/fs` directory.

- `dist/fs/index.js` (not bundled) has the node script to be used as middleware for webpack devServer or express server to create the api for development.

## How to register with CMS on a static page locally

  - Copy the package `dist/index.js` script bundle file into your cms location (maybe `fs.js`).
  - Change the `index.html` page to use the backend as in the example below
  - Register the backend Class to the CMS as shown below
  - Change the `config.yml` backend to `backend: file-system` or the name you registered
  - [Webpack] Add devServer middleware to expose the `/api` path for the file-system API
  - [Stand Alone Server] Create an express server (coming soon) to host the `/api` endpoint

### Add script and register in your CMS page

```html
<head>
  ...
</head>
<body>
  <script type="text/javascript" src='cms.js'/>
  <script type="text/javascript" src="fs.js"/>
  <script>
    CMS.registerBackend("file-system", FileSystemBackend)
  </script>
</body>
```

### Start your devServer using the middleware scripts

[Starters Coming Soon] or you can see the [netlify-cms-starter][1] for a create-react-app example.

## Dependencies

This library requires you to be using [NetlifyCMS][3] v2.x or above.

***Recommendation:*** If you are looking to extend NetlifyCMS and run a local file-system setup for development, use the [netlify-cms-react-example][4] starter project. It implements the backend as a component and bundles to a custom CMS deployment for your project.

***WARNING:*** This is a development tool. It can safely be used in a repository locally, since it is not used in production code. Commit and push changes before you start using.

Don't forget: code like you are on 🔥

The Netlify Logo is Copyright of [Netlify][2] and should not be used without their consent.

[1]: https://github.com/adarta/netlify-cms-components/packages/netlify-cms-starter
[2]: https://www.netlify.com/
[3]: https://www.netlifycms.org/
[4]: https://github.com/adarta/netlify-cms-react-example
