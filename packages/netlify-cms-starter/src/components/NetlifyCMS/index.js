import React from 'react';
import './setup'
import CMS from './cms';
import FileSystemBackend from 'netlify-cms-backend-fs/dist/index';

import config from './data/config.json';
import AuthorsPreview from './components/AuthorsPreview';
import EditorYoutube from './components/EditorYoutube';

function NetlifyCMS() {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // const FileSystemBackend = import('netlify-cms-backend-fs');
      // console.log('FileSystemBackend', FileSystemBackend)
      config.backend = {
        "name": "file-system",
        "api_root": "http://localhost:3000/api"
      }
      CMS.registerBackend('file-system', FileSystemBackend);
    }
    CMS.registerPreviewTemplate('authors', AuthorsPreview);
    CMS.registerEditorComponent(EditorYoutube);
    
    CMS.init({ config });
  })

  return (
    <div id="nc-root" />
  );
}

export default NetlifyCMS;
