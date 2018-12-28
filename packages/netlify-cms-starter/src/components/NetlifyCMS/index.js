import React, { Component } from 'react';
import './setup'
// import CMS, { init } from 'netlify-cms/dist/netlify-cms.es5';
import CMS, { init } from 'netlify-cms';
// import * as StarterWidget from 'netlify-cms-widget-starter';
// import FileSystemBackend from 'netlify-cms-backend-fs/dist';

import config from './data/config.json';
import AuthorsPreview from './components/AuthorsPreview';
import EditorYoutube from './components/EditorYoutube';

CMS.init = init;
console.log(`CMS imported`, CMS)

class NetlifyCMS extends Component {
  componentDidMount () {
    console.log(`CMS [${process.env.NODE_ENV}]`, CMS, )
    if (process.env.NODE_ENV === 'development') {
      const { FileSystemBackend } = require('netlify-cms-backend-fs');
      console.log('FileSystemBackend:', FileSystemBackend);
      config.backend = {
        "name": "file-system",
        "api_root": "http://localhost:3000/api"
      }
      CMS.registerBackend('file-system', FileSystemBackend);
    }
    CMS.init({config});
    CMS.registerPreviewTemplate('authors', AuthorsPreview);
    CMS.registerEditorComponent(EditorYoutube);
    // CMS.registerWidget('test', StarterWidget.Control, StarterWidget.Preview);
  }
  render() {
    return (
      <div id="nc-root" />
    );
  }
}

export default NetlifyCMS;
