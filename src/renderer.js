var Article = require('./article');

// Renders an article
// --------
//

var Renderer = function(doc) {
  this.doc = doc;
  // var that = this;

  // TODO: use reflection
  this.nodeTypes = Article.nodeTypes;

  // Collect all node views
  this.nodes = {};

  // Build views
  _.each(this.doc.getNodes(), function(node) {
    this.nodes[node.id] = this.createView(node);
  }, this);
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
    nodeView.listenTo(this.doc, "operation:applied", nodeView.onGraphUpdate);
    return nodeView;
  };

  // Render it
  // --------
  // 

  this.render = function() {
    var frag = document.createDocumentFragment();
    
    var docNodes = this.doc.getNodes();
    _.each(docNodes, function(n) {
      frag.appendChild(this.nodes[n.id].render().el);
    }, this);
    return frag;
  };

}

Renderer.prototype = new Renderer.Prototype();

module.exports = Renderer;