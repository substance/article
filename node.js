"use strict";

// Substance.Node
// -----------------

var SubstanceNode = function() {

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
SubstanceNode.Transformer = NodeTransformer;

module.exports = SubstanceNode;
