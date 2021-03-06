import trimStart from 'lodash/trimStart';
import uuid from 'uuid/v4';
import AuthenticationPage from './AuthenticationPage';
import API from './API';
import { fileExtension } from './lib/pathHelper';

const nameFromEmail = email => {
  return email
    .split('@')
    .shift()
    .replace(/[.-_]/g, ' ')
    .split(' ')
    .filter(f => f)
    .map(s => s.substr(0, 1).toUpperCase() + (s.substr(1) || ''))
    .join(' ');
};

export class FileSystemBackend {
  constructor(config) {
    this.config = config;

    this.api_root = config.getIn(['backend', 'api_root'], 'http://localhost:8080/api');
    console.log(`Setting up file-system backend api: ${this.api_root}`);
    if (FILESYSTEMBACKEND_VERSION) {
      console.log(FILESYSTEMBACKEND_VERSION);
    }
  }

  authComponent() {
    return AuthenticationPage;
  }

  restoreUser(user) {
    return this.authenticate(user);
  }

  authenticate(state) {
    this.api = new API({ api_root: this.api_root });
    return Promise.resolve({ email: state.email, name: nameFromEmail(state.email) });
  }

  logout() {
    return null;
  }

  getToken() {
    return Promise.resolve('');
  }

  entriesByFolder(collection, extension) {
    return this.api
      .listFiles(collection.get('folder'))
      .then(files => files.filter(file => fileExtension(file.name) === extension))
      .then(files => this.fetchFiles(files));
  }

  entriesByFiles(collection) {
    const files = collection.get('files').map(collectionFile => ({
      path: collectionFile.get('file'),
      label: collectionFile.get('label'),
    }));
    return this.fetchFiles(files);
  }

  fetchFiles(files) {
    const api = this.api;
    const promises = [];
    files.forEach(file => {
      promises.push(
        new Promise((resolve, reject) =>
          api.readFile(file.path)
            .then(data => {
              resolve({ file, data });
            })
            .catch(err => {
              reject(err);
            })
        )
      );
    });
    return Promise.all(promises);
  }

  getEntry(collection, slug, path) {
    return this.api.readFile(path).then(data => ({
      file: { path },
      data,
    }));
  }

  getMedia() {
    const publicFolderPath = this.config.get('public_folder') || '';
    return this.api
      .listFiles(this.config.get('media_folder'))
      .then(files => files.filter(file => file.type === 'file'))
      .then(files =>
        files.map(({ name, stats, path }) => {
          return {
            id: uuid(),
            name,
            size: stats.size,
            urlIsPublicPath: false,
            displayURL: `${publicFolderPath}/${name}`,
            url: `${publicFolderPath}/${name}`,
            path,
          };
        }),
      );
  }

  persistEntry(entry, mediaFiles = [], options = {}) {
    return this.api.persistFiles(entry, mediaFiles, options);
  }

  async persistMedia(mediaFile, options = {}) {
    try {
      await this.api.persistFiles(null, [mediaFile], options);

      const { sha, value, path, fileObj } = mediaFile;
      const displayURL = URL.createObjectURL(fileObj);
      return {
        id: sha || `backend-fs-${value}`,
        name: value,
        size: fileObj.size,
        displayURL,
        path: trimStart(path, '/') };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteFile(path, commitMessage, options) {
    return this.api.deleteFile(path, commitMessage, options);
  }
}
