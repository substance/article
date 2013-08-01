"use strict";

var TextTransformer = require('../text').Transformer;

// Substance.Code.Transformer
// -----------------
//
// Manipulation interface for all node types
// This behavior can overriden by the concrete node types

var CodelineTransformer = function(document, node) {
  TextTransformer.call(this, document, node)
};


CodelineTransformer.Prototype = function() {

};

CodelineTransformer.Prototype.prototype = TextTransformer.prototype;
CodelineTransformer.prototype = new CodelineTransformer.Prototype();

module.exports = CodelineTransformer;