var _ = require('underscore');
var Node = require('../node');


// Substance.Text.Transformer
// -----------------
//
// Manipulation interface shared by all textish types (paragraphs, headings)
// This behavior can overriden by the concrete node types

var TextTransformer = function(document, node) {
  Node.Transformer.call(this, document, node);
};

TextTransformer.Prototype = function() {
  
};

TextTransformer.Prototype.prototype = Node.Transformer.prototype;
TextTransformer.prototype = new TextTransformer.Prototype();

module.exports = TextTransformer;