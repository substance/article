"use strict";

var View = require("substance-application").View;
var util = require("substance-util");
var html = util.html;

// Substance.Node
// -----------------

var Node = function(node) {
  this.properties = node;
};

// Does not define any properties
// since it's read only and immutable

Node.schema = {
  "parent": "content",
  "properties": {
  }
};

Node.properties = {
  immutable: true,
  mergeableWith: [],
  preventEmpty: true,
  allowedAnnotations: []
};


Node.Prototype = function() {

};

Node.prototype = new Node.Prototype();


// TODO: Construct dynamically using schema

Object.defineProperties(Node.prototype, {
  id: {
    get: function () {
      return this.properties.id;
    }
  },
  type: {
    get: function () {
      return this.properties.type;
    }
  },
  content: {
    get: function () {
      return [
        {"type": "paragraph", "name": "Paragraph"},
        {"type": "heading", "name": "Heading"},
        {"type": "image", "name": "Image"},
        {"type": "codeblock", "name": "Codeblock"}
      ]
    }
  }
});


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

  // Hacky hack
  if (node.type === "node") {
    this.node = new Node(node);  
  } else {
    this.node = node;
  }

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
    this.stopListening();
  };
};

NodeView.Prototype.prototype = View.prototype;
NodeView.prototype = new NodeView.Prototype();


Node.Transformer = NodeTransformer;
Node.View = NodeView;

module.exports = Node;
