"use strict";

var _ = require("underscore");

var nodes = {};

_.each(require("substance-nodes"), function(spec, name) {
  nodes[name] = _.clone(spec);
});

module.exports = nodes;
