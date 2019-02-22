/* -*- mode: espresso; espresso-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set softtabstop=2 shiftwidth=2 tabstop=2 expandtab: */
"use strict";

import {CATMAID} from "./namespace.js";


/**
 * A minimal JSON serializer.
 */
export let CATMAID_JsonSerializer = function() {};

CATMAID_JsonSerializer.prototype.serialize = function(state) {
  return JSON.stringify(state);
};

CATMAID_JsonSerializer.prototype.deserialize = function(serializedState) {
  return JSON.parse(serializedState);
};
