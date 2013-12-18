"use strict";

var ViewFactory = require("./view_factory");
var _ = require("underscore");

// Renders an article
// --------
//

var ArticleRenderer = function(document, viewName, options) {
  ViewFactory.call(this, document);

  this.viewName = viewName;
  this.options = options || {};
  this.nodeViews = {};
};

ArticleRenderer.Prototype = function() {

  var __super__ = ViewFactory.prototype;

  this.createView = function(node) {
    var nodeView = __super__.createView.call(this, node);
    // register node view to be able to look up nested views later
    this.nodeViews[node.id] = nodeView;
    return nodeView;
  };

  // Render it
  // --------
  //

  this.render = function() {
    _.each(this.nodeViews, function(nodeView) {
      nodeView.dispose();
    });

    var frag = document.createDocumentFragment();

    var nodeIds = this.document.get(this.viewName).nodes;
    _.each(nodeIds, function(id) {
      var node = this.document.get(id);
      var view = this.createView(node);
      frag.appendChild(view.render().el);

      // Lets you customize the resulting DOM sticking on the el element
      // Example: Lens focus controls
      if (this.options.afterRender) {
        this.options.afterRender(this.document, view);
      }
    }, this);

    return frag;
  };

  this.getView = function(id) {
    return this.nodeViews[id];
  };

};

ArticleRenderer.Prototype.prototype = ViewFactory.prototype;
ArticleRenderer.prototype = new ArticleRenderer.Prototype();

module.exports = ArticleRenderer;
