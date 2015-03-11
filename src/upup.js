//! UpUp
//! version : 0.0.1
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUp

(function (undefined) {
  "use strict";

  // Save a reference to the global object (window in the browser)
  var _root = this;

  // get ServiceWorker object
  var _sw = navigator.serviceWorker;

  // Check browser support
  // This is done as early as possible, to make it as fast as possible for unsupported browsers
  if (!_sw) {
    _root.UpUp = null;
    return undefined;
  }

  // Settings live here, and these are their defaults
  var _settings = {
    'script': 'upup.sw.min.js'
  };

  // Expose functionality
  _root.UpUp = {

    /**
     * Make this site available offline
     *
     * Can receive a settings object directly, or be configured by running addSettings() first.
     * See Settings section of docs for details.
     * - `content`      (String) The content to display when user is offline.
     *
     * ### Examples:
     *     // Set up offline mode with a basic message
     *     UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
     *
     *     // Set up offline mode with the settings defined previously via addSettings()
     *     UpUp.start();
     *
     * @param {Object} [settings] - Settings for offline mode
     * @method start
     */
    start: function(settings) {
      this.addSettings(settings);

      // register the service worker
      _sw.register(_settings.script, {scope: './'}).then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    },

    /**
     * Adds settings to configure how UpUp behaves.
     * Call this before running start, or just pass the settings object when calling the start method.
     *
     * Receives a mandatory settings object. See Settings section of docs for details.
     *
     * ### Examples:
     *     // Set up offline mode with a basic message
     *     UpUp.addSettings({ content: 'Cannot reach site. Please check your internet connection.' });
     *     UpUp.start();
     *
     *     // The same thing can be achieved like this
     *     UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
     *
     * @param {Object} [settings] - Settings for offline mode
     * @method addSettings
     * @see [Settings](#settings)
     */
    addSettings: function(settings) {
      settings = settings || {};
      _settings['content'] = settings['content'] || null;
    }

  };

}).call(this);

/**
 * # Good to Know
 *
 * ## Settings
 *
 * UpUp can be configured either by calling addSettings() with a settings object, or by passing the
 * same settings object directly to the start() method.
 *
 * ### Examples:
 *     // Set up offline mode with a basic message
 *     UpUp.addSettings({ content: 'Cannot reach site. Please check your internet connection.' });
 *     UpUp.start();
 *
 *     // The same thing can be achieved like this
 *     UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
 *
 *
 * The settings object supports the following options:
 * - `content`      (String) The content to display when user is offline.
 */