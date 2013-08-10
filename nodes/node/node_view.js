var util = require("substance-util");
var View = require("substance-application").View;
var html = util.html;

// Substance.Node.View
// -----------------

var NodeView = function(node) {
  View.call(this);

  this.node = node;

  this.$el.addClass('content-node');
  this.$el.attr('id', this.node.id);
};

NodeView.Prototype = function() {

  // Rendering
  // --------
  //

  this.render = function() {
    this.$el.html(html.tpl('node', this.node));
    this.content = this.el.querySelector(".content");
    return this;
  };

  this.dispose = function() {
    this.stopListening();
  };

  // Retrieves the corresponding character position for the given DOM position.
  // --------
  //

  this.getCharPosition = function(el, offset) {
    throw new Error("NodeView.getCharPosition() is abstract.");
  };

  // Retrieves the corresponding DOM position for a given character.
  // --------
  //

  this.getDOMPosition = function(charPos) {
    throw new Error("NodeView.getDOMPosition() is abstract.");
  };

};

NodeView.Prototype.prototype = View.prototype;
NodeView.prototype = new NodeView.Prototype();

module.exports = NodeView;
