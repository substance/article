"use strict";

var _ = require("underscore");

var nodes = {};

_.each(require("substance-nodes"), function(spec, name) {
  nodes[name] = _.clone(spec);
});

nodes["figure"] = {
  Model: require("./figure/figure"),
  View: nodes["composite"].View
};

module.exports = nodes;
