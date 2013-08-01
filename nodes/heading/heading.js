"use strict";

var Text = require("../text");


var Heading = function(node) {
  Text.call(this, node);
};

Heading.type = {
  "parent": "content",
  "properties": {
    "content": "string",
    "level": "number"
  }
};

Heading.properties = {
  mergeableWith: ["paragraph", "heading"],
  preventEmpty: false,
  splitInto: 'paragraph',
  allowedAnnotations: ["emphasis", "strong", "idea", "question", "error"]
};


Heading.Prototype = function() {

};

Heading.Prototype.prototype = Text.prototype;
Heading.prototype = new Heading.Prototype();


module.exports = Heading;