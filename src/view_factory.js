"use strict";

var ViewFactory = function(document) {
  this.document = document;
  this.nodeTypes = document.nodeTypes;
};

ViewFactory.Prototype = function() {

  // Create a node view
  // --------
  //
  // Experimental: using a factory which creates a view for a given node type
  // As we want to be able to reuse views
  // However, as the matter is still under discussion consider the solution here only as provisional.
  // We should create views, not only elements, as we need more, e.g., event listening stuff
  // which needs to be disposed later.

  this.createView = function(node) {
    var NodeView = this.nodeTypes[node.type].View;
    if (!NodeView) {
      throw new Error('Node type "'+node.type+'" not supported');
    }
    // Note: passing the renderer to the node views
    // to allow creation of nested views
    var nodeView = new NodeView(node, this);

    // we connect the listener here to avoid to pass the document itself into the nodeView
    nodeView.listenTo(this.document, "operation:applied", nodeView.onGraphUpdate);

    return nodeView;
  };

};

ViewFactory.prototype = new ViewFactory.Prototype();

module.exports = ViewFactory;
