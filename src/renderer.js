var Article = require('./article');
var _ = require("underscore");

// Renders an article
// --------
//

var Renderer = function(docController) {
  this.docController = docController;
  // var that = this;

  // TODO: use reflection
  this.nodeTypes = Article.nodeTypes;

  // Collect all node views
  this.nodes = {};
};

Renderer.Prototype = function() {
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
    nodeView.listenTo(this.docController, "operation:applied", nodeView.onGraphUpdate);

    // register node view to be able to look up nested views later
    this.nodes[node.id] = nodeView;

    return nodeView;
  };

  // Render it
  // --------
  //

  this.render = function() {
    _.each(this.nodes, function(nodeView) {
      nodeView.dispose();
    });

    var frag = document.createDocumentFragment();

    var docNodes = this.docController.container.getTopLevelNodes();
    _.each(docNodes, function(n) {
      frag.appendChild(this.createView(n).render().el);
    }, this);

    return frag;
  };

};

Renderer.prototype = new Renderer.Prototype();

module.exports = Renderer;
