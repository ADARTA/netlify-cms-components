import React, { Component } from 'react';
import './setup'
// import CMS, { init } from 'netlify-cms/dist/netlify-cms.es5';
import CMS, { init } from '../netlify-cms/dist/netlify-cms-manual-init';
// import * as StarterWidget from 'netlify-cms-widget-starter';
// import { FileSystemBackend } from 'netlify-cms-backend-fs';

import config from './data/config.json';
import AuthorsPreview from './components/AuthorsPreview';
import EditorYoutube from './components/EditorYoutube';

CMS.init = init;

class NetlifyCMS extends Component {
  componentDidMount () {
    if (process.env.NODE_ENV === 'development') {
      const { FileSystemBackend } = require('netlify-cms-backend-fs');
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
