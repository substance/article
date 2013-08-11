var _ = require('underscore');
var Node = require('../node');
var Operator = require('substance-operator');


// Substance.Text
// -----------------
//

var Text = function(node) {
  Node.call(this, node);
};

Text.Prototype = function() {

  this.getUpdatedCharPos = function(op) {
    if (op.path[1] === "content") {
      var lastChange = Operator.Helpers.last(op.diff);
      if (lastChange.isInsert()) {
        return lastChange.pos+lastChange.length();
      } else if (lastChange.isDelete()) {
        return lastChange.pos;
      }
    }
    return -1;
  };
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
