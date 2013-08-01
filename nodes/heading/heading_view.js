"use strict";

var _ = require('underscore');
var util = require('substance-util');
var html = util.html;
var TextView = require('../text').View;

// Substance.Heading.View
// ==========================================================================

var HeadingView = function(node) {
  TextView.call(this, node);

  this.$el.addClass('content-node heading');
};

HeadingView.Prototype = function() {
  
  // Rendering
  // =============================
  //
};

HeadingView.Prototype.prototype = TextView.prototype;
HeadingView.prototype = new HeadingView.Prototype();

module.exports = HeadingView;
