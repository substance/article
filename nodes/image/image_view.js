"use strict";

var _ = require('underscore');
var util = require('substance-util');
var html = util.html;
var Node = require("../node");

// Substance.Image.View
// ==========================================================================

var ImageView = function(node) {
  Node.View.call(this, node);


  this.$el.addClass('content-node image');
  this.$el.attr('id', this.node.id);
};

ImageView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    this.$el.html(html.tpl('image', this.node));
    return this;
  };

  this.dispose = function() {
    console.log('disposing image view');
    this.stopListening();
  };

  this.delete = function(pos, length) {
    var content = this.$('.content')[0];
    var spans = content.childNodes;
    for (var i = length - 1; i >= 0; i--) {
      content.removeChild(spans[pos+i]);
    }
  };
};

ImageView.Prototype.prototype = Node.View.prototype;
ImageView.prototype = new ImageView.Prototype();

module.exports = ImageView;