"use strict";

var Text = require("../text");

var Codeblock = function(node, document) {
  Text.call(this, node, document);
};

// Type definition
// --------

Codeblock.type = {
  "parent": "content",
  "properties": {
    "content": "string"
  }
};


// Define behavior
// --------

Codeblock.properties = {
  mergeableWith: ["codeblock"],
  preventEmpty: false,
  splitInto: 'codeblock',
  allowedAnnotations: ["idea", "question", "error"]
};

Codeblock.Prototype = function() {
};


Codeblock.Prototype.prototype = Text.prototype;
Codeblock.prototype = new Codeblock.Prototype();
Codeblock.prototype.constructor = Codeblock;

module.exports = Codeblock;
