"use strict";

var TextView = require('../text').View;

// Substance.Codeblock.View
// ==========================================================================

var CodeblockView = function(node) {
  TextView.call(this, node);

  this.$el.addClass('content-node codeblock');
};

CodeblockView.Prototype = function() {};

CodeblockView.Prototype.prototype = TextView.prototype;
CodeblockView.prototype = new CodeblockView.Prototype();

module.exports = CodeblockView;
