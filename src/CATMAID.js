/* -*- mode: espresso; espresso-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set softtabstop=2 shiftwidth=2 tabstop=2 expandtab: */
"use strict";

import $ from "jquery";
import {Promise} from "es6-promise";

import {CATMAID} from "./namespace.js";

// Global request queue
export const requestQueue = new CATMAID_RequestQueue();
// todo: look at

// Add some basic functionality

/**
 * Throws an error if the provided object is no string of at least length 1.
 */
var validateString = function(str, name) {
  if (!str || !str.length || str.length === 0) {
    throw Error("No proper " + name + " provided!");
  }
};

/**
 * Test if a string ends with a certain suffix.
 */
var startsWith = function(str, prefix) {
  return str.indexOf(prefix) === 0;
};

/**
 * Test if a string ends with a certain suffix.
 */
var endsWith = function(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

/**
 * Set up the front-end environment. Both URLs are stored so that they contain
 * a trailing slash.
 *
 * @param {string} backendURL     The URL pointing to CATMAID's back-end.
 * @param {string} staticURL      The URL pointing to CATMAID's static files.
 * @param {string} staticExtURL   Optional, the relative URL pointing to
 *                                CATMAID's static extension files.
 * @param {string} csrfCookieName The name of the cookie containing the
 *                                CSRF token to be sent to the backend with XHRs.
 * @param {string} cookieSuffix   A suffix that is used to make cookie names
 *                                unique.
 * @param {Object} permissions    (Optional) Instead of getting permission from
 *                                the back-end (=undefined) or using no
 *                                initial permissions (=null), use these instead.
 * @param {bool}   history        (Optional) Indicate if history tracking is
 *                                enabled in the back-end, default is true.
 */
export let CATMAID_configure = function(backendURL, staticURL, staticExtURL,
    csrfCookieName, cookieSuffix, permissions, history) {
  validateString(backendURL, "back-end URL");
  validateString(staticURL, "static URL");
  if (typeof staticExtURL === 'undefined') staticExtURL = '';

  Object.defineProperty(CATMAID, "backendURL", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: endsWith(backendURL, "/") ? backendURL : backendURL + "/"
  });

  Object.defineProperty(CATMAID, "staticURL", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: endsWith(staticURL, "/") ? staticURL : staticURL + "/"
  });

  Object.defineProperty(CATMAID, "staticExtensionURL", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: endsWith(staticExtURL, "/") ? staticExtURL : staticExtURL + "/"
  });

  Object.defineProperty(CATMAID, "csrfCookieName", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: csrfCookieName
  });

  Object.defineProperty(CATMAID, "cookieSuffix", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: cookieSuffix
  });

  Object.defineProperty(CATMAID, "historyTracking", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: history === 'undefined' ? true : !!history
  });

  CATMAID_setupCsrfProtection();

  if (null === permissions) {
    // Use an empty set of permissions. Typically a login happens after
    // configuration, wher permissions change anyhow. This prevents an
    // additional permission request on start-up.
    permissions = {};
  }
  CATMAID_updatePermissions(permissions);
};

/**
 * Build a CATMAID back-end URL.
 *
 * @param {string} path - The relative path, without backend URL. A leading
 *                        slash is not required.
 * @returns {string} The complete CATMAID URL.
 */
export let CATMAID_makeURL = function(path) {
  validateString(path, "relative path for URL creation");
  return CATMAID_backendURL + (startsWith(path, "/") ? path.substr(1) : path);
};

/**
 * Build a CATMAID static URL.
 *
 * @param {string} path - The relative path, without backend URL. A leading
 *                        slash is not required.
 * @returns {string} The complete CATMAID URL.
 */
export let CATMAID_makeStaticURL = function(path) {
  validateString(path, "relative path for URL creation");
  return CATMAID_staticURL + (startsWith(path, "/") ? path.substr(1) : path);
};

/**
 * Build a CATMAID static extension URL. This URL refers to a location were
 * extensions to CATMAID live that are not part of the main source tree.
 *
 * @param {string} path - The relative path, without backend URL. A leading
 *                        slash is not required.
 * @returns {string}    - The complete URL.
 */
export let CATMAID_makeStaticExtensionURL = function(path) {
  validateString(path, "relative path for URL creation");
  return CATMAID_staticExtensionURL +
    (startsWith(path, "/") ? path.substr(1) : path);
};

/**
 * Create a documentation URL for www.catmaid.org.
 *
 * @param {string} path - The relative path, without domain URL. A leading
 *                        slash is not required.
 * @returns {string}    - The complete URL.
 */
export let CATMAID_makeDocURL = function(path) {
  validateString(path, "relative path for URL creation");
  var version = CATMAID_getVersionRelease();
  return "http://catmaid.readthedocs.org/en/" + version + "/" +
    (startsWith(path, "/") ? path.substr(1) : path);
};

/**
 * Create a release changelog URL for the GitHub repo.
 *
 * @returns {string}    - The complete URL.
 */
export let CATMAID_makeChangelogURL = function() {
  var version = CATMAID_getVersionRelease();
  if ('stable' === version) {
    return "https://github.com/catmaid/CATMAID/releases/latest";
  } else {
    return "https://github.com/catmaid/CATMAID/releases/tag/" + version;
  }
};

/**
 * Return a named value from a cookie.
 *
 * @param {String}  name     The key for the value to retrieve.
 * @param {Boolean} noSuffix Optional, disable automatic appending of
 *                           CATMAID's cookie suffix to the cookie name.
 * @returns                  The returned value or undefined if no value for
 *                           the passed in name is available.
 */
export let CATMAID_getCookie = function(name, noSuffix) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {

      if (!noSuffix) {
        name = name + '_' + CATMAID_cookieSuffix;
      }

      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
};

/**
 * Define a cookie value for a particular name.
 *
 * @param {String}  name     The key for the value to store.
 * @param {String}  value    The value to store.
 * @param {Number}  days     Optional, time how long cookie should be stored.
 * @param {Boolean} noSufifx Optional, disable automatic appending of
 *                           CATMAID's cookie suffix to the cookie name.
 */
export let CATMAID_setCookie = function(name, value, days, noSuffix) {
  if (document.cookie && document.cookie !== '') {
    var maxAge = "";
    if (days) {
      var seconds = days * 24 * 60 * 60;
      maxAge = "; max-age=" + seconds;
    }

    if (!noSuffix) {
      name = name + '_' + CATMAID_cookieSuffix;
    }

    document.cookie = name + "=" + value + maxAge + "; path=/";
  }
};

/**
 * Infer the CATMAID release from the client version.
 *
 * @return {string} The release version, or "stable" if none could be guessed.
 */
export let CATMAID_getVersionRelease = function () {
  var version = CATMAID_CLIENT_VERSION.split('-')[0];
  if (version.length === 0 || version.split('.').length !== 3)
    version = "stable";
  return version;
};

/**
 * Setup CSRF protection on AJAX requests made through requestQueue or
 * jQuery's ajax method.
 */
export let CATMAID_setupCsrfProtection = function () {
  var csrfCookie = CATMAID_csrfCookieName ?
      CATMAID_getCookie(CATMAID_csrfCookieName, true) :
      undefined;

  window.requestQueue = new CATMAID_RequestQueue(CATMAID_backendURL, csrfCookie);
  $.ajaxPrefilter(function (options, origOptions, jqXHR) {
    if (0 === options.url.indexOf(CATMAID_backendURL) &&
        !CATMAID_RequestQueue.csrfSafe(options.type)) {
      jqXHR.setRequestHeader('X-CSRFToken', csrfCookie);
    }
  });
};

// Disable session permission by default
var projectPermissions = null;
var groups = [];

/**
 * Set permissions on a per-project basis. They can be checked by calls to
 * CATMAID_requirePermission(). If set to null, permission checks are disabled
 * and CATMAID_requirePermission() calls will be a no-op.
 *
 * @param {Object} permissions Optional, the new permission object, mapping
 *                             permission names to project IDs. If not
 *                             provided the back-end is asked for a permission
 *                             summary.
 *
 * @returns Promise that is resolved after permissions have been updated.
 */
export let CATMAID_updatePermissions = function(permissions) {
  if (permissions) {
    projectPermissions = {};
    for (var p in permissions) {
      projectPermissions[p] = new Set(permissions[p]);
    }
    return Promise.resolve();
  } else {
    return CATMAID_fetch('permissions', 'GET').then(function(json) {
      var newPermissions = json[0];
      projectPermissions = {};
      for (var p in newPermissions) {
        projectPermissions[p] = new Set(newPermissions[p]);
      }
      groups = json[1];
    }).catch(alert);
  }
};

/**
 * Check if the user of the current session has permission on another user. If
 * a CATMAID user is part of a group that has the name like another user, the
 * first user is given permission the second one.
 *
 * @param {String} username The username of the user in question.
 */
export let CATMAID_hasPermissionOnUser = function(username) {
  return groups.indexOf(username) != -1;
};

/**
 * Check if the passed in response information seems valid and without errors.
 */
export let CATMAID_validateResponse = function(status, text, xml, responseType) {
  var isTextResponse = !responseType || responseType === '' || responseType === 'text';
  if (status >= 200 && status <= 204 &&
      (!isTextResponse || typeof text === 'string' || text instanceof String)) {
    return text;

  } else if (status === 502) { // Bad Gateway
    var error = new CATMAID_NetworkAccessError("CATMAID server unreachable",
        "Please wait or try to reload");
    error.statusCode = status;
    throw error;
  } else {
    var error = new CATMAID_Error("The server returned an unexpected status: " + status);
    error.statusCode = status;
    throw error;
  }
};

/**
 * Check if the passed in response information seems valid and without
 * errors and expect the text to be JSON.
 *
 * @returns {Object} parsed resonse text
 */
export let CATMAID_validateJsonResponse = function(status, text, xml) {
  var response = CATMAID_validateResponse(status, text, xml);
  // `text` may be empty for no content responses.
  var json = text.length ? JSON.parse(text) : {};
  if (json.error) {
    var error = CATMAID_parseErrorResponse(json);
    throw error;
  } else {
    return json;
  }
};

/**
 * Translate an error response into the appropriate front-end type.
 */
export let CATMAID_parseErrorResponse = function(error) {
  if ('ValueError' === error.type) {
    return new CATMAID_ValueError(error.error, error.detail);
  } else if ('StateMatchingError' === error.type) {
    return new CATMAID_StateMatchingError(error.error, error.detail);
  } else if ('LocationLookupError' === error.type) {
    return new CATMAID_LocationLookupError(error.error, error.detail);
  } else if ('PermissionError' === error.type) {
    return new CATMAID_PermissionError(error.error, error.detail);
  } else {
    return new CATMAID_Error("Unsuccessful request: " + error.error,
        error.detail, error.type);
  }
};

/**
 * Queue a request for the given back-end method along with the given data. It
 * expects a JSON response. A promise is returned. The URL passed in needs to
 * be relative to the back-end URL.
 *
 * @param relativeURL
 * @param method
 * @param data
 * @param {Boolean} raw     (Optional) If truthy, no JSON validation and
 *                          parsing is performed.
 * @param {String}  id      (Optional) An ID for the request, to be able to
 *                          refer to with replace.
 * @param {Boolean} replace (Optional) If truthy, a request with the same ID
 *                          is replaced by this one.
 * @param {String}  responseType (Optional) An expected response type for the
 *                               request (e.g. text or blob).
 * @param {Object}  headers (Optional) If an object, set headers on the request
 *                          with keys/ values like the object's. These override
 *                          default headers and the queue's extraHeaders.
 * @param {API}     api     (Optional) An API that should be contacted instead
 *                          of the current environment.
 */
export let CATMAID_fetch = function(relativeURL, method, data, raw, id, replace,
    responseType, headers, parallel, details, api) {
  // Alternatively, accept a single argument that provides all parameters as
  // fields.
  let absoluteURL;
  if (arguments.length === 1 && typeof(arguments[0]) !== "string") {
    let options = arguments[0];
    relativeURL = options.relativeURL ? options.relativeURL : options.url;
    absoluteURL = options.absoluteURL;
    method = options.method;
    data = options.data;
    raw = options.raw;
    id = options.id;
    replace = options.replace;
    responseType = options.responseType;
    headers = options.headers;
    parallel = options.parallel;
    details = options.details;
    api = options.api;
  }

  // If an API instance is provided, relative URLs are replaced with an
  // absolute URL at the target host and additional request parameters like
  // API keys and HTTP authentication are added.
  let url;
  if (api) {
    if (api.apiKey && api.apiKey.length > 0) {
      if (!headers) headers = {};
      headers['X-Authorization'] = 'Token ' + api.apiKey;
      headers['X-Requested-With'] = undefined;
    }
    // The URL will only be changed if no absolute URL is already provided,
    // i.e. a relative URL is expected.
    url = absoluteURL ? absoluteURL : CATMAID_tools.urlJoin(api.url, relativeURL);
  } else {
    url = absoluteURL ? absoluteURL : CATMAID_makeURL(relativeURL);
  }

  method = method || 'GET';
  return new Promise(function(resolve, reject) {
    let queue = parallel ? requestQueue.clone() : requestQueue;
    var fn = replace ? queue.replace : queue.register;
    fn.call(requestQueue, url, method, data, function(status, text, xml, dataSize) {
      // Validation throws an error for bad requests and wrong JSON data,
      // which would causes the promise to become rejected automatically if
      // this wasn't an asynchronously called function. But since this is the
      // case, we have to call reject() explicitly.
      try {
        if (raw) {
          var response = CATMAID_validateResponse(status, text, xml, responseType);
          if (details) {
            resolve({
              data: text,
              dataSize: dataSize,
            });
          } else {
            resolve(text);
          }
        } else {
          var json = CATMAID_validateJsonResponse(status, text, xml);
          if (details) {
            resolve({
              data: json,
              dataSize: dataSize,
            });
          } else {
            resolve(json);
          }
        }
      } catch (e) {
        reject(e);
      }
    }, id, responseType, headers);
  });
};

/**
 * Add an extra header field to all future requests or until it is removed
 * again.
 *
 * @param {String} name  The name of the new header field
 * @param {String} value The value of the new header field
 */
export let CATMAID_addHeaderToRequests = function(name, value) {
  requestQueue.addHeader(name, value);
};

/**
 * Remove a previously added extra header field from all future requests or
 * until it is added again.
 *
 * @param {String} name  The name of the header field to remove
 */
export let CATMAID_removeHeaderFromRequests = function(name) {
  requestQueue.removeHeader(name);
};

/**
 * If front-end permission checks are enabled, it can be checked if the
 * current session allows a certain permission on a paticular project. Returns
 * true if permission checks are disabled.
 *
 * @param {String} permission The permission to test
 *
 * @returns True if the permission is given for the passed in project or if
 *          permission checks are disabled. False otherwise.
 */
export let CATMAID_hasPermission = function(projectId, permission) {
  if (null === projectPermissions) {
    return false;
  }
  return projectPermissions && projectPermissions[permission] &&
    projectPermissions[permission].has(projectId);
};

// A set of error messages for the lack of particular permissions
var permissionErrorMessages = {
  'can_browse': 'You don\'t have permission to browse this project.',
  'can_annotate': 'You don\'t have permission to make changes to this project'
};

/**
 * If front-end permission checks are enabled, throw a CATMAID_PermissionError
 * if a given permission isn't available for the passed in project ID. This
 * test can be disabled if permissions are set to null. If front-end end
 * permission checks are disabled, this is a no-op.
 *
 * @param {Id}     projectId  The ID of the project to check permissions for
 * @param {String} permission The permission to test
 * @param {String} msg        (Optional) Error message in case of lack of
 *                            permission
 *
 * @returns True, if a permission check was performed. False otherwise (e.g.
 *          when permission checks are disabled)
 */
export let CATMAID_requirePermission = function(projectId, permission, msg) {
  if (!CATMAID_hasPermission) {
    msg = msg || permissionErrorMessages[permission] || ('Permission "' +
        permission + '" is not given for project "' + projectId + '"');
    throw new CATMAID_PermissionError(msg);
  }
};

/**
 * A general noop function.
 */
export let CATMAID_noop = function() {};

/**
 * A function call wrapper that will one particular field of a target object
 * during a function call and resets it afterwards.
 */
export let CATMAID_with = function(target, field, value, isPromise, fn, resetValue) {
  var originalValue = 5 === arguments.length ? target[field] : resetValue;
  target[field] = value;
  var result = fn();
  if (isPromise) {
    var done = function(r) {
      target[field] = originalValue;
      return r;
    };
    result = result.then(done);
    // Reset in error case separetly from general error handling of this
    // promise.
    result.catch(done);
  } else {
    target[field] = originalValue;
  }
  return result;
};

/**
 * Test if <key> is available in <options> and return if this is the case,
 * otherwise return <default>.
 */
export let CATMAID_getOption = function(options, key, defaultValue) {
  return options.hasOwnProperty(key) ? options[key] : defaultValue;
};

/**
 * Test if <files> is a valid source of a single file name with the passed in
 * extension.
 */
export let CATMAID_containsSingleValidFile = function(files, extension) {
    if (0 === files.length) {
      CATMAID_error("Choose at least one file!");
      return false;
    }
    if (files.length > 1) {
      CATMAID_error("Choose only one file!");
      return false;
    }

    var name = files[0].name;
    if (extension) {
      if (extension[0] !== '.') {
        extension = '.' + extension;
      }
      extension = extension.toLowerCase();
      if (name.toLowerCase().lastIndexOf(extension) !== name.length - extension.length) {
        CATMAID_error("File extension must be '." + extension + "'");
        return false;
      }
    }

    return true;
};

/**
 * Return a function to perform text matching, either as substring or as a regular expression when the text starts with a '/'. Returns null if the text is not suitable.
 */
export let CATMAID_createTextMatchingFunction = function(text) {
  text = text.trim();
  if (!text) {
    CATMAID_msg("Select by regular expression", "No text.");
    return null;
  }
  var match;
  if ('/' === text[0]) {
    // Search by regular expression
    match = (function(regexp, label) {
      return regexp.test(label);
    }).bind(null, new RegExp(text.substr(1), 'i'));
  } else {
    // Search by indexOf
    match = function(label) {
      return -1 !== label.indexOf(text);
    };
  }
  return match;
};

/**
 * Return a promise that resolves when the back-end is reachable and rejects
 * otherwise. This is done directly with AJAX to be independent from own
 * request/response implementations.
 */
export let CATMAID_testNetworkAccess = function() {
  var url = CATMAID_makeURL('version');
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      try {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            resolve(true);
          } else {
            resove(false);
          }
        }
      } catch(error) {
        resolve(false);
      }
    };
    xhr.open('GET', url);
    xhr.send();
  });
};

/**
 * Merge source fields into key if they appear in defaults, if a default does
 * not exist in the source, set it optionally to the default.
 */
export let CATMAID_mergeOptions = function(target, source, defaults, setDefaults) {
  // Only allow options that are defined in the default option list
  for (var key in defaults) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    } else if (setDefaults &&
        defaults.hasOwnProperty(key)) {
      target[key] = defaults[key];
    }
  }
};
