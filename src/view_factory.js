"use strict";

var ViewFactory = function(doc) {
  this.document = doc;
  this.nodeTypes = doc.nodeTypes;
};

ViewFactory.Prototype = function() {

  // For a given node's type get the corresponding view class
  // --------
  //

  this.getNodeViewClass = function(node, type) {
    type = type || node.type;
    var NodeType = this.nodeTypes[type];
    if (!NodeType) {
      throw new Error('No node registered for type ' + type + '.');
    }
    var NodeView = NodeType.View;
    if (!NodeView) {
      throw new Error('No view registered for type "'+node.type+'".');
    }
    return NodeView;
  };

  // Create a node view
  // --------
  //

  this.createView = function(node, options, type) {
    var NodeView = this.getNodeViewClass(node, type);
    // Note: passing the factory to the node views
    // to allow creation of nested views
    var nodeView = new NodeView(node, this, options);

    // we connect the listener here to avoid to pass the document itself into the nodeView
    nodeView.listenTo(this.document, "operation:applied", nodeView.onGraphUpdate);
    return nodeView;
  };
};

ViewFactory.prototype = new ViewFactory.Prototype();

module.exports = ViewFactory;
