/* -*- mode: espresso; espresso-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set softtabstop=2 shiftwidth=2 tabstop=2 expandtab: */

import {CATMAID} from "./namespace.js";

/**
 * A general warning with description.
 */
CATMAID_Warning = function(message) {
  this.name = 'CATMAID warning';
  this.message = message || '(no message)';
};

/**
 * A general error containing a message of what went wrong.
 */
CATMAID_Error = function(message, detail, type) {
  this.name = 'CATMAID error';
  this.message = message || '(no message)';
  this.stack = (new Error()).stack;
  this.detail= detail || this.stack;
  this.type = type;

  // Make error message also available through 'error' field, to be consistent
  // with the back-end API in that regard.
  this.error = this.message;
};

CATMAID_Error.prototype = Object.create(Error.prototype);
CATMAID_Error.prototype.constructor = CATMAID_Error;

/**
 * A simple value error type to indicate some sort of input value problem.
 */
CATMAID_ValueError = function(message, detail) {
  CATMAID_Error.call(this, message, detail, 'ValueError');
};

CATMAID_ValueError.prototype = Object.create(CATMAID_Error.prototype);
CATMAID_ValueError.prototype.constructor = CATMAID_ValueError;

/**
 * A simple permission error type to indicate some lack of permissions.
 */
CATMAID_PermissionError = function(message, detail) {
  CATMAID_Error.call(this, message, detail);
};

CATMAID_PermissionError.prototype = Object.create(CATMAID_Error.prototype);
CATMAID_PermissionError.prototype.constructor = CATMAID_PermissionError;

/**
 * An error type to indicate out of range errors in a command history.
 */
CATMAID_CommandHistoryError = function(message, detail) {
  CATMAID_Error.call(this, message, detail);
};

CATMAID_CommandHistoryError.prototype = Object.create(CATMAID_Error.prototype);
CATMAID_CommandHistoryError.prototype.constructor = CATMAID_CommandHistoryError;

/**
 * An error type to indicate a state mismatch between front-end and back-end.
 */
CATMAID_StateMatchingError = function(message, detail) {
  CATMAID_Error.call(this, message, detail);
};

CATMAID_StateMatchingError.prototype = Object.create(CATMAID_Error.prototype);
CATMAID_StateMatchingError.prototype.constructor = CATMAID_StateMatchingError;

/**
 * An error type to indicate an unsuccesful location lookup.
 */
CATMAID_LocationLookupError = function(message, detail) {
  CATMAID_Error.call(this, message, detail);
};

CATMAID_LocationLookupError.prototype = Object.create(CATMAID_Error.prototype);
CATMAID_LocationLookupError.prototype.constructor = CATMAID_LocationLookupError;

CATMAID_TooManyWebGlContextsError = function(message, detail) {
  CATMAID_Error.call(this, message, detail);
};

CATMAID_TooManyWebGlContextsError.prototype = Object.create(CATMAID_Error.prototype);
CATMAID_TooManyWebGlContextsError.prototype.constructor = CATMAID_TooManyWebGlContextsError;

/**
 * Represent the error condition of no WebGL support.
 */
CATMAID_NoWebGLAvailableError = function(message, detail) {
  CATMAID_Error.call(this, message, detail);
};

CATMAID_NoWebGLAvailableError.prototype = Object.create(CATMAID_Error.prototype);
CATMAID_NoWebGLAvailableError.prototype.constructor = CATMAID_NoWebGLAvailableError;

/**
 * An error type to indicate network access problems.
 */
CATMAID_NetworkAccessError = function(message, detail) {
  CATMAID_Error.call(this, message, detail);
};

CATMAID_NetworkAccessError.prototype = Object.create(CATMAID_Error.prototype);
CATMAID_NetworkAccessError.prototype.constructor = CATMAID_NetworkAccessError;

/*
 * An error type to indicate a pre-condition for some action is not met.
 */
CATMAID_PreConditionError = function(message, detail) {
  CATMAID_Error.call(this, message, detail);
};

CATMAID_PreConditionError.prototype = Object.create(CATMAID_Error.prototype);
CATMAID_PreConditionError.prototype.constructor = CATMAID_PreConditionError;

/**
 * An error type to indicate an abstract method is not implemented.
 */
CATMAID_NotImplementedError = class NotImplementedError extends CATMAID_Error {};
