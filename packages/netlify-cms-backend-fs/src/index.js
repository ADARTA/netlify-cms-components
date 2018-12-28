import { FileSystemBackend } from './implementation';

/**
 * Add extension hooks to global scope.
 */
if (typeof window !== 'undefined') {
  window.FileSystemBackend = FileSystemBackend;
}

export default FileSystemBackend;