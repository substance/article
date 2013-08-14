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

      listItem.appendChild(bullet);
      this.content.appendChild(listItem);
    }

    return this;
  };

  this.getCharPosition = function(el, offset) {
    // find the list item element which is a parent of the given el
    // and then compute the list global character position.
    var current = el;

    var itemPos = -1;
    while(current && current !== this.content) {
      if ($(current).is(".listitem")) {
        itemPos = Array.prototype.indexOf.call(this.content.childNodes, current);
        break;
      }
      current = current.parentElement;
    }

    // TODO: handle bullet items

    if (itemPos < 0) {
      console.error("Could not find appropriate list item");
      return -1;
    }

    var items = this.node.items;
    var charPos = this.itemViews[itemPos].getCharPosition(el, offset);
    for (var i = itemPos-1; i >= 0; i--) {
      charPos += items[i].length;
    }

    return charPos;
  };

  // Returns the corresponding DOM element position for the given character
  // --------
  //
  // A DOM position is specified by a tuple of element and offset.
  // In the case of text nodes it is a TEXT element.

  this.getDOMPosition = function(charPos) {

    var items = this.node.items;
    var total = 0;
    for (var i = 0; i < items.length; i++) {
      var l = items[i].length;
      if (charPos < l) {
        return this.itemViews[i].getDOMPosition(charPos);
      }
      charPos -= l;
      total += l;
    };

    console.error("Bug in ListView.getDOMPosition(). Returning last valid position.")

    var last = _.last(items);
    var lastView = _.last(this.itemViews);

    return lastView.getDOMPosition(last.length);
  };

};

ListView.Prototype.prototype = NodeView.prototype;
ListView.prototype = new ListView.Prototype();

module.exports = ListView;
