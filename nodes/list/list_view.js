"use strict";

var _ = require('underscore');
var util = require('substance-util');
var html = util.html;
var NodeView = require('../node').View;
var TextView = require('../text').View;

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
  }
};

ListView.Prototype.prototype = NodeView.prototype;
ListView.prototype = new ListView.Prototype();

module.exports = ListView;
