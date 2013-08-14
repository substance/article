"use strict";

var Text = require("../text");

var Paragraph = function(node, document) {
  Text.call(this, node, document);
};

Paragraph.type = {
  "parent": "content",
  "properties": {
    "content": "string"
  }
};

Paragraph.properties = {
  mergeableWith: ["paragraph", "heading"], // maybe remove heading here
  preventEmpty: false,
  splitInto: 'paragraph',
  allowedAnnotations: ["emphasis", "strong", "link", "code", "idea", "question", "error"]
};

Paragraph.Prototype = function() {};

Paragraph.Prototype.prototype = Text.prototype;
Paragraph.prototype = new Paragraph.Prototype();
Paragraph.prototype.constructor = Paragraph;

module.exports = Paragraph;
