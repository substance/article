var Node = require("../node");
var util = require("substance-util");
var html = util.html;

// Substance.Node.View
// -----------------

var ConstructorView = function(node) {
  Node.View.call(this, node);

  this.$el.addClass('constructor');
  this.$el.attr('id', this.node.id);
};

ConstructorView.Prototype = function() {

  // Rendering
  // --------
  //

  this.render = function() {
    console.log('MEH', this.node);
    this.$el.html(html.tpl('constructor', this.node));
    return this;
  };

  this.dispose = function() {
    this.stopListening();
  };
};

ConstructorView.Prototype.prototype = Node.View.prototype;
ConstructorView.prototype = new ConstructorView.Prototype();

module.exports = ConstructorView;