"use strict";

var _ = require('underscore');
var util = require('substance-util');
var html = util.html;

var TextView = require('../text').View;

// Substance.Codeblock.View
// ==========================================================================

var CodelineView = function(node) {
  TextView.call(this, node);

  this.$el.addClass('content-node codeline');
};

CodelineView.Prototype = function() {

};

CodelineView.Prototype.prototype = TextView.prototype;
CodelineView.prototype = new CodelineView.Prototype();

module.exports = CodelineView;
