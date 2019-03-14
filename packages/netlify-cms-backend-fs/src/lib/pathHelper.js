// eslint-disable-next-line
const normalizePath = path => path.replace(/[\\\/]+/g, '/');

/**
 * Return the extension of the path, from the last '.' to end of string in the
 * last portion of the path. If there is no '.' in the last portion of the path
 * or the first character of it is '.', then it returns an empty string.
 * @example Usage example
 *   path.fileExtensionWithSeparator('index.html')
 *   // returns
 *   '.html'
 */
export function fileExtensionWithSeparator(p) {
  p = normalizePath(p);
  const sections = p.split('/');
  p = sections.pop();
  // Special case: foo/file.ext/ should return '.ext'
  if (p === '' && sections.length > 0) {
    p = sections.pop();
  }
  if (p === '..') {
    return '';
  }
  const i = p.lastIndexOf('.');
  if (i === -1 || i === 0) {
    return '';
  }
  return p.substr(i);
}

/**
 * Return the extension of the path, from after the last '.' to end of string in the
 * last portion of the path. If there is no '.' in the last portion of the path
 * or the first character of it is '.', then it returns an empty string.
 * @example Usage example
 *   path.fileExtension('index.html')
 *   // returns
 *   'html'
 */
export function fileExtension(p) {
  const ext = fileExtensionWithSeparator(p);
  return ext === '' ? ext : ext.substr(1);
}
