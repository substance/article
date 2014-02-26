"use strict";

var _ = require("underscore");

var nodes = {};

// TODO: we should change the 'substance-nodes' module in that way,
// that it provides a function that gives the cloned set
_.each(require("substance-nodes"), function(spec, name) {
  nodes[name] = _.clone(spec);
});

module.exports = nodes;
