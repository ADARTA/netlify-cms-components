const fsAPI = require('../fs/fs-api');
const { site, files, file } = fsAPI;

site.setPath('src');

files('.').read(result => {
  result.map(item => {
    console.log(` ${item.name} [${item.path}]`);
  })
})
