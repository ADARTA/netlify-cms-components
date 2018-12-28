/**
 * Tells NetlifyCMS that you will be initializing the CMS manually rather than automatically
 * Only available in version 1.3.6 and above of NetlifyCMS
 * Use: import './setup.js'
 */
if (typeof window !== 'undefined') {
  window.CMS_MANUAL_INIT = true;
}
