"use strict";

var Text = require("../text");

var Codeblock = function(node) {
  Text.call(this, node);
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


Codeblock.Prototype.prototype = Node.prototype;
Codeblock.prototype = new Codeblock.Prototype();


module.exports = Codeblock;