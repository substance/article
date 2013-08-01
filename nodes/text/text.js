var _ = require('underscore');
var Node = require('../node');


// Substance.Text
// -----------------
//

var Text = function(node) {
  Node.call(this, node);
};

Text.Prototype = function() {

};

Text.Prototype.prototype = Node.prototype;
Text.prototype = new Text.Prototype();

Object.defineProperties(Text.prototype, {
  content: {
    get: function () {
      return this.properties.content;
    },
    set: function (content) {
      this.properties.content = content;
    }
  }
});

module.exports = Text;