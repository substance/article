"use strict";

var ViewFactory = function(doc) {
  this.document = doc;
  this.nodeTypes = doc.nodeTypes;
};

ViewFactory.Prototype = function() {

  // Create a node view
  // --------
  //

  this.createView = function(node, options) {
    var NodeView = this.nodeTypes[node.type].View;
    if (!NodeView) {
      throw new Error('Node type "'+node.type+'" not supported');
    }
    // Note: passing the renderer to the node views
    // to allow creation of nested views
    var nodeView = new NodeView(node, surface, options);

    // we connect the listener here to avoid to pass the document itself into the nodeView
    nodeView.listenTo(this.document, "operation:applied", nodeView.onGraphUpdate);

    return nodeView;
  };

};

ViewFactory.prototype = new ViewFactory.Prototype();

module.exports = ViewFactory;
