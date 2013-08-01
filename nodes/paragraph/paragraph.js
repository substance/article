"use strict";

var Text = require("../text");

var Paragraph = function(node) {
  Text.call(this, node);
};

Paragraph.type = {
  "parent": "content",
  "properties": {
    "content": "string"
  }
}

Paragraph.properties = {
  mergeableWith: ["paragraph", "heading"], // maybe remove heading here
  preventEmpty: false,
  splitInto: 'paragraph',
  allowedAnnotations: ["emphasis", "strong", "link", "idea", "question", "error"]
};


Paragraph.Prototype = function() {

};

Paragraph.Prototype.prototype = Text.prototype;
Paragraph.prototype = new Paragraph.Prototype();

module.exports = Paragraph;