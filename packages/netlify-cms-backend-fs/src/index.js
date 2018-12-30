import { FileSystemBackend } from './implementation';

/**
 * Add extension hooks to global scope.
 */
if (typeof window !== 'undefined') {
  window.FileSystemBackendClass =
    window.FileSystemBackendClass || window.FileSystemBackend ? window.FileSystemBackend.default : FileSystemBackend;
}

export default FileSystemBackend;
