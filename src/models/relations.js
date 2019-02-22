/* -*- mode: espresso; espresso-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set softtabstop=2 shiftwidth=2 tabstop=2 expandtab: */
"use strict";

import {Promise} from "es6-promise";

import {CATMAID} from "../namespace.js";
import {CATMAID_fetch} from "../CATMAID";


// Keep a copy of the available relations.
var relationCache = null;

var Relations = {
  list: function(projectId, forceCacheUpdate) {
    if (forceCacheUpdate || !relationCache) {
      return CATMAID_fetch(projectId + '/ontology/relations')
        .then(function(result) {
          relationCache = result;
          return result;
        });
    } else {
      return Promise.resolve(relationCache);
    }
  },

  getNameMap: function(projectId, forceCacheUpdate) {
    return CATMAID_Relations.list(projectId, forceCacheUpdate)
      .then(function(relationIds) {
        let relationNames = {};
        for (let relationName in relationIds) {
          let relationId = relationIds[relationName];
          relationNames[relationId] = relationName;
        }
        return relationNames;
      });
  }
};

// Export
export let CATMAID_Relations = Relations;
