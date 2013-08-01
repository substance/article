var View = require("substance-application").View;
var util = require("substance-util");
var html = util.html;

// Substance.Node.View
// -----------------

var NodeView = function(node) {
  View.call(this);

  // Hacky hack
  if (node.type === "node") {
    this.node = new Node(node);  
  } else {
    this.node = node;
  }

  this.$el.addClass('content-node node');
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
};

NodeView.Prototype.prototype = View.prototype;
NodeView.prototype = new NodeView.Prototype();

module.exports = NodeView;