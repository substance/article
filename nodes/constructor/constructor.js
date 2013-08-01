"use strict";

var util = require("substance-util");
var Node = require('../node');

// Substance.Node
// -----------------

var Constructor = function(node) {
  this.properties = node;
};

// Type definition
// --------
// 

Constructor.type = {
  "parent": "content",
  "properties": {
    "content": ["array", "object"]
  }
};

// Define node behavior
// --------

Constructor.properties = {
  volatile: true,
  immutable: true,
  mergeableWith: [],
  preventEmpty: true,
  allowedAnnotations: []
};

Constructor.Prototype = function() {

};

Constructor.Prototype.prototype = Node.prototype;
Constructor.prototype = new Constructor.Prototype();

Object.defineProperties(Constructor.prototype, {
  content: {
    get: function () {
      return [
        {"type": "paragraph", "name": "Paragraph"},
        {"type": "heading", "name": "Heading"},
        {"type": "image", "name": "Image"},
        {"type": "codeblock", "name": "Codeblock"}
      ]
    }
  }
});


module.exports = Constructor;