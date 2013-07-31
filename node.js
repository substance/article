"use strict";

var View = require("substance-application").View;
var util = require("substance-util");
var html = util.html;


// Substance.Node
// -----------------

var Node = function() {

};

Node.properties = {
  mergeableWith: [],
  preventEmpty: true,
  allowedAnnotations: []
};

// Substance.Node.Transformer
// -----------------
//
// Manipulation interface for all node types
// This behavior can overriden by the concrete node types

var NodeTransformer = function(document, node) {
  // Usually you get passed in a simulation here
  this.document = document;
  this.node = node;
};


NodeTransformer.Prototype = function() {

  // Deletes a given range from the node's content
  // --------
  // 
  // Merging must be done from outisde in a separate step

  this.deleteRange = function(range) {
    var doc = this.document;
    doc.update([this.node.id, "content"], [range.start, -range.length()]);
  };
};

NodeTransformer.prototype = new NodeTransformer.Prototype();


// Substance.Node.View
// -----------------

var NodeView = function(node) {
  View.call(this);
  this.node = node;

  this.$el.addClass('content-node node');
  this.$el.attr('id', this.node.id);
};

NodeView.Prototype = function() {

  // Rendering
  // --------
  //

  this.render = function() {
    this.$el.html(html.tpl('node', this.node));
    return this;
  };

  this.dispose = function() {
    console.log('disposing paragraph view');
    this.stopListening();
  };
};

NodeView.Prototype.prototype = View.prototype;
NodeView.prototype = new NodeView.Prototype();


Node.Transformer = NodeTransformer;
Node.View = NodeView;

module.exports = Node;
