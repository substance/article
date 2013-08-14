"use strict";

var _ = require('underscore');
var NodeView = require('../node').View;

// Substance.Heading.View
// ==========================================================================

var ListView = function(node) {
  NodeView.call(this, node);
  this.$el.addClass('list');
};

ListView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    _.each(this.node.items, function(item) {
      var $listitem = $('<div class="listitem"></div>').html(item.content);
      $listitem.append('<div class="bullet"></div>');
      this.$('.content').append($listitem);
    }, this);
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
