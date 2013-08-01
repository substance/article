// Substance.Node.Transformer
// -----------------
//
// Manipulation interface for all node types
// This behavior can overriden by the concrete node types

var ConstructorTransformer = function(document, node) {
  // Usually you get passed in a simulation here
  this.document = document;
  this.node = node;
};


ConstructorTransformer.Prototype = function() {

  // Deletes a given range from the node's content
  // --------
  // 
  // Merging must be done from outisde in a separate step

  this.deleteRange = function(range) {
    var doc = this.document;
    doc.update([this.node.id, "content"], [range.start, -range.length()]);
  };
};

ConstructorTransformer.prototype = new ConstructorTransformer.Prototype();


module.exports = ConstructorTransformer;