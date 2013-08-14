"use strict";

var NodeView = require('../node').View;

// Substance.Heading.View
// ==========================================================================

var ListView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);
  this.$el.addClass('list');

  this.itemViews = [];
};

ListView.Prototype = function() {

  this.dispose = function() {
    NodeView.prototype.dispose.call(this);

    for (var i = 0; i < this.itemViews.length; i++) {
      this.itemViews[i].dispose();
    }
  };

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    var i;
    for (i = 0; i < this.itemViews.length; i++) {
      this.itemViews[i].dispose();
    }

    this.itemViews = [];
    this.content.innerHTML = "";

    var items = this.node.items;

    for (i = 0; i < items.length; i++) {
      var item = items[i];

      var listItem = document.createElement("DIV");
      listItem.classList.add("listitem");

      var itemView = this.viewFactory.createView(item);
      listItem.appendChild(itemView.render().el);
      this.itemViews.push(itemView);

      var bullet = document.createElement("DIV");
      bullet.classList.add("bullet");

      this.content.appendChild(listItem);
      this.content.appendChild(bullet);
    }

    return this;
  };

  this.getCharPosition = function(el, offset) {
    console.log("ListView.getCharPosition()", el, offset);
    return 0;
  };

  // Returns the corresponding DOM element position for the given character
  // --------
  //
  // A DOM position is specified by a tuple of element and offset.
  // In the case of text nodes it is a TEXT element.

  this.getDOMPosition = function(charPos) {
    console.log("ListView.getDOMPosition()", charPos);
    return [null, 0];
  };

};

ListView.Prototype.prototype = NodeView.prototype;
ListView.prototype = new ListView.Prototype();

module.exports = ListView;
