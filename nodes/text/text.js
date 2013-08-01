var _ = require('underscore');
var Node = require('../node');


// Substance.Text
// -----------------
//

var Text = function(node) {
  Node.call(this, node);
};

Text.prototype = Node.prototype;


module.exports = Text;