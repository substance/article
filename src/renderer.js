"use strict";

var ViewFactory = require("./view_factory");
var _ = require("underscore");

// Renders an article
// --------
//

var Renderer = function(docController, options) {
  ViewFactory.call(this, docController.__document);

  this.docController = docController;
  this.options = options || {};

  // to collect all node views
  this.nodes = {};
};

Renderer.Prototype = function() {

  var __super__ = ViewFactory.prototype;

  this.createView = function(node) {
    var nodeView = __super__.createView.call(this, node);
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
      var view = this.createView(n);
      frag.appendChild(view.render().el);
      // Lets you customize the resulting DOM sticking on the el element
      // Example: Lens focus controls
      if (this.options.afterRender) this.options.afterRender(this.docController, view);
    }, this);

    return frag;
  };

};

Renderer.Prototype.prototype = ViewFactory.prototype;
Renderer.prototype = new Renderer.Prototype();

module.exports = Renderer;
