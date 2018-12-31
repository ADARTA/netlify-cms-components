const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = console.log;

const { version, name } = require('../../package.json');
log(chalk.green(`${name} (version: ${version})`));

const projectRoot = path.join(process.cwd());
log(chalk.green(`Root path is ${ projectRoot }`));

const siteRoot = {
  dir: path.join(projectRoot, "example")
};
const setPath = (relPath) => {
  siteRoot.dir = path.join(projectRoot, relPath);
  log(chalk.green(`Site path is ${ siteRoot.dir }`));
};

const logError = (message) => {
  log(chalk.red(message));
  return new Error(message);
}

const notCallback = (cb) => {
  return (typeof cb !== "function")
}

module.exports = {
  site: { setPath },
  files: (dirname) => {
    const name = "Files";
    const read = (cb) => {
      if (notCallback(cb)) throw logError(`${name}.read: missing callback(content)`);
      const thispath = path.join(siteRoot.dir, dirname);
      const dirExists = fs.existsSync(thispath);
      if (!dirExists) log(chalk.yellow(`Warning: Directory missing ${thispath}`));
      const files =  dirExists ? fs.readdirSync(thispath) : [];
      const filelist = [];
      files.forEach(function(element) {
        const filePath = path.join(thispath, element);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          filelist.push({ name: element, path: `${ dirname }/${ element }`, stats, type: "file" });
        }
      }, this);
      cb(filelist);
    };
    return { read, name };
  },
  file: (id) => {
    const name = "File";
    const thisfile = path.join(siteRoot.dir, id);

    const readStats = (path) => {
      let stats;
      try {
        stats = fs.statSync(thisfile);
      } catch (err) {
        stats = {};
      }
      return stats;
    }

    /* GET-Read an existing file */
    const read = (cb) => {
      if (notCallback(cb)) throw logError(`${name}.read: missing callback(content)`);
      const stats = readStats(thisfile);
      if (typeof stats.isFile === "function" && stats.isFile()) {
        fs.readFile(thisfile, 'utf8', (err, data) => {
          if (err) {
            cb({ error: err });
          } else {
            cb(data);
          }
        });
      } else {
        cb({ error: logError(`${name}.read: - not a file(${thisfile})`) });
      }
    };
    /* POST-Create a NEW file, ERROR if exists */
    const create = (body, cb) => {
      if (notCallback(cb)) throw logError(`${name}.create: missing callback(content)`);
      if (fs.existsSync(thisfile)) throw new Error(`Invalid call to ${name}.create - File does exists(${thisfile})`);
      fs.writeFile(thisfile, body.content, { encoding: body.encoding, flag: 'wx' }, (err) => {
        if (err) {
          cb({ error: err });
        } else {
          cb(body.content);
        }
      });
    };
    /* PUT-Update an existing file */
    const update = (body, cb) => {
      if (notCallback(cb)) throw logError(`${name}.update: missing callback(content)`);
      if (!fs.existsSync(thisfile)) throw new Error(`Invalid call to ${name}.update - File does not exist(${thisfile})`);
      fs.writeFile(thisfile, body.content, { encoding: body.encoding, flag: 'w' }, (err) => {
        if (err) {
          cb({ error: err });
        } else {
          cb(body.content);
        }
      });
    };
    /* DELETE an existing file */
    const del = (cb) => {
      if (notCallback(cb)) throw logError(`${name}.del: missing callback(content)`);
      fs.unlink(thisfile, (err) => {
        if (err) {
          cb({ error: err });
        } else {
          cb(`Deleted File ${ thisfile }`);
        }
      });
    };
    return { read, create, update, del };
  },
};
