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
    return this;
  };

  this.dispose = function() {
    this.stopListening();
  };

  this.getCharPosition = function(el, offset) {
    return offset;
  };

  this.getDOMPosition = function(charPos) {
    var el = this.$(".content")[0].childNodes[0];
    var offset = charPos;
    return [el, charPos];
  };

};

NodeView.Prototype.prototype = View.prototype;
NodeView.prototype = new NodeView.Prototype();

module.exports = NodeView;