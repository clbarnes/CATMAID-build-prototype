/* -*- mode: espresso; espresso-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set softtabstop=2 shiftwidth=2 tabstop=2 expandtab: */
"use strict";

import {CATMAID} from "../namespace.js";


let Group = {};

/**
 * List all groups, optionally only the ones a particular user is member of.
 *
 * @params memberId {Number} (optional) User ID to list groups for.
 * @returns {Promise} Resolves when
 */
Group.list = function(memberId) {
  return CATMAID_fetch('/groups/', 'GET', {
    member_id: memberId,
  });
};

// Export into namespace
export let CATMAID_Group = Group;
