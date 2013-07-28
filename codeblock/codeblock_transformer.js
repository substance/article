"use strict";

var TextTransformer = require('../text').Transformer;

// Substance.Code.Transformer
// -----------------
//
// Manipulation interface for all node types
// This behavior can overriden by the concrete node types

var CodeblockTransformer = function(document, node) {
  TextTransformer.call(this, document, node)
};


CodeblockTransformer.Prototype = function() {

};

CodeblockTransformer.Prototype.prototype = TextTransformer.prototype;
CodeblockTransformer.prototype = new CodeblockTransformer.Prototype();

module.exports = CodeblockTransformer;