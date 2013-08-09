var _ = require('underscore');
var Node = require('../node');
var util = require("substance-util");
var html = util.html;

// Substance.Text.View
// -----------------
//
// Manipulation interface shared by all textish types (paragraphs, headings)
// This behavior can overriden by the concrete node types

var TextView = function(node) {
  Node.View.call(this, node);

  this.$el.addClass('content-node text');
  this.$el.attr('id', this.node.id);
};

TextView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    this.$el.html(html.tpl('text', this.node));
    this.renderContent();
    return this;
  };

  this.dispose = function() {
    console.log('disposing paragraph view');
    this.stopListening();
  };

  this.renderContent = function() {
    content = this.el.querySelector(".content");
    content.innerHTML = this.node.content;
  };

  this.insert = function(pos, str) {
    content = this.el.querySelector(".content");
    content.innerHTML = this.node.content;
  };

  this.delete = function(pos, length) {
    content = this.el.querySelector(".content");
    content.innerHTML = this.node.content;
  };
};

TextView.Prototype.prototype = Node.View.prototype;
TextView.prototype = new TextView.Prototype();

module.exports = TextView;
