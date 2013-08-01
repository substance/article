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
        {"type": "paragraph", "name": '<i class="icon-align-left"></i> Paragraph'},
        {"type": "heading", "name": '<i class="icon-h-sign"></i> Heading'},
        {"type": "image", "name": '<i class="icon-picture"></i> Image'},
        {"type": "codeblock", "name": '<i class="icon-code"></i> Codeblock'}
      ]
    }
  }
});


module.exports = Constructor;